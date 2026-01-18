// Deriv API integration for real commission data
export interface DerivConfig {
  apiToken: string
  appId: string
  serverUrl?: string
}

export interface CommissionData {
  totalCommission: number
  totalTrades: number
  activeSites: number
  avgVolume: number
  sites: SiteData[]
  chartData: ChartDataPoint[]
}

export interface SiteData {
  id: string
  name: string
  commission: number
  trades: number
  status: 'active' | 'inactive'
  token: string
  lastUpdate: string
}

export interface ChartDataPoint {
  date: string
  commission: number
  trades: number
  volume: number
}

export class DerivAPI {
  private config: DerivConfig
  private ws: WebSocket | null = null

  constructor(config: DerivConfig) {
    this.config = config
  }

  // Connect to Deriv WebSocket API
  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsUrl = this.config.serverUrl || 'wss://ws.derivws.com/websockets/v3'
      this.ws = new WebSocket(`${wsUrl}?app_id=${this.config.appId}`)

      this.ws.onopen = () => {
        console.log('Connected to Deriv API')
        resolve()
      }

      this.ws.onerror = (error) => {
        console.error('Deriv API connection error:', error)
        reject(error)
      }

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.handleMessage(data)
      }
    })
  }

  // Authenticate with API token
  async authorize(): Promise<void> {
    if (!this.ws) throw new Error('Not connected to Deriv API')

    return new Promise((resolve, reject) => {
      const request = {
        authorize: this.config.apiToken,
        req_id: 1
      }

      const timeout = setTimeout(() => {
        reject(new Error('Authorization timeout'))
      }, 10000)

      const originalOnMessage = this.ws!.onmessage
      this.ws!.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.req_id === 1) {
          clearTimeout(timeout)
          this.ws!.onmessage = originalOnMessage
          
          if (data.error) {
            reject(new Error(data.error.message))
          } else {
            console.log('Authorized successfully')
            resolve()
          }
        }
      }

      this.ws!.send(JSON.stringify(request))
    })
  }

  // Get affiliate commission data
  async getCommissionData(): Promise<CommissionData> {
    if (!this.ws) throw new Error('Not connected to Deriv API')

    return new Promise((resolve, reject) => {
      const request = {
        affiliate_account_add: 1,
        req_id: 2
      }

      const timeout = setTimeout(() => {
        reject(new Error('Commission data request timeout'))
      }, 15000)

      const originalOnMessage = this.ws!.onmessage
      this.ws!.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.req_id === 2) {
          clearTimeout(timeout)
          this.ws!.onmessage = originalOnMessage
          
          if (data.error) {
            reject(new Error(data.error.message))
          } else {
            const commissionData = this.parseCommissionData(data)
            resolve(commissionData)
          }
        }
      }

      this.ws!.send(JSON.stringify(request))
    })
  }

  // Get profit table (commission history)
  async getProfitTable(dateFrom?: string, dateTo?: string): Promise<ChartDataPoint[]> {
    if (!this.ws) throw new Error('Not connected to Deriv API')

    return new Promise((resolve, reject) => {
      const request = {
        profit_table: 1,
        description: 1,
        sort: 'ASC',
        ...(dateFrom && { date_from: dateFrom }),
        ...(dateTo && { date_to: dateTo }),
        req_id: 3
      }

      const timeout = setTimeout(() => {
        reject(new Error('Profit table request timeout'))
      }, 15000)

      const originalOnMessage = this.ws!.onmessage
      this.ws!.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.req_id === 3) {
          clearTimeout(timeout)
          this.ws!.onmessage = originalOnMessage
          
          if (data.error) {
            reject(new Error(data.error.message))
          } else {
            const chartData = this.parseProfitTable(data.profit_table)
            resolve(chartData)
          }
        }
      }

      this.ws!.send(JSON.stringify(request))
    })
  }

  // Parse commission data from API response
  private parseCommissionData(data: any): CommissionData {
    // This would need to be adapted based on actual Deriv API response structure
    const transactions = data.affiliate_account_add?.transactions || []
    
    const totalCommission = transactions.reduce((sum: number, tx: any) => 
      sum + (tx.commission || 0), 0)
    
    const totalTrades = transactions.length
    
    // Group by site/client
    const siteMap = new Map()
    transactions.forEach((tx: any) => {
      const siteKey = tx.client_id || 'unknown'
      if (!siteMap.has(siteKey)) {
        siteMap.set(siteKey, {
          id: siteKey,
          name: `Client ${siteKey}`,
          commission: 0,
          trades: 0,
          status: 'active' as const,
          token: tx.token || '',
          lastUpdate: new Date().toISOString()
        })
      }
      
      const site = siteMap.get(siteKey)
      site.commission += tx.commission || 0
      site.trades += 1
    })

    return {
      totalCommission,
      totalTrades,
      activeSites: siteMap.size,
      avgVolume: totalCommission / Math.max(totalTrades, 1),
      sites: Array.from(siteMap.values()),
      chartData: this.generateChartFromTransactions(transactions)
    }
  }

  // Parse profit table for chart data
  private parseProfitTable(profitTable: any): ChartDataPoint[] {
    if (!profitTable?.transactions) return []

    const dailyData = new Map()
    
    profitTable.transactions.forEach((tx: any) => {
      const date = new Date(tx.purchase_time * 1000).toISOString().split('T')[0]
      
      if (!dailyData.has(date)) {
        dailyData.set(date, {
          date,
          commission: 0,
          trades: 0,
          volume: 0
        })
      }
      
      const dayData = dailyData.get(date)
      dayData.commission += tx.sell_price - tx.buy_price
      dayData.trades += 1
      dayData.volume += tx.buy_price
    })

    return Array.from(dailyData.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  // Generate chart data from transactions
  private generateChartFromTransactions(transactions: any[]): ChartDataPoint[] {
    const dailyData = new Map()
    
    transactions.forEach((tx: any) => {
      const date = new Date(tx.created_at || Date.now()).toISOString().split('T')[0]
      
      if (!dailyData.has(date)) {
        dailyData.set(date, {
          date,
          commission: 0,
          trades: 0,
          volume: 0
        })
      }
      
      const dayData = dailyData.get(date)
      dayData.commission += tx.commission || 0
      dayData.trades += 1
      dayData.volume += tx.amount || 0
    })

    return Array.from(dailyData.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  private handleMessage(data: any) {
    // Handle real-time updates if needed
    console.log('Received message:', data)
  }

  // Disconnect from API
  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}
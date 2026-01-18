import { NextResponse } from 'next/server'

// Mock API endpoint for commission data
export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const mockData = {
    totalCommission: 3211.80,
    totalTrades: 123,
    activeSites: 4,
    avgVolume: 7500,
    sites: [
      { 
        id: 'VRTC7528369',
        name: 'dexterator.com', 
        commission: 1250.50, 
        trades: 45, 
        status: 'active',
        token: 'a1-AtLIsGBTSlddC270Hazg1Pdcq8IK5',
        lastUpdate: new Date().toISOString()
      },
      { 
        id: 'VRTC7528370',
        name: 'mastertrader.com', 
        commission: 890.25, 
        trades: 32, 
        status: 'active',
        token: 'b2-BtMJtHCUTmeeD381Ibah2Qedr9JL6',
        lastUpdate: new Date().toISOString()
      },
      { 
        id: 'VRTC7528371',
        name: 'tradersden.site', 
        commission: 650.75, 
        trades: 28, 
        status: 'active',
        token: 'c3-CtNKuIDVUnffE492Jcbi3Rfes0KM7',
        lastUpdate: new Date().toISOString()
      },
      { 
        id: 'VRTC7528372',
        name: 'autotrades.site', 
        commission: 420.30, 
        trades: 18, 
        status: 'active',
        token: 'd4-DuOLvJEWVoggF503Kdcj4Sgft1LN8',
        lastUpdate: new Date().toISOString()
      },
    ],
    chartData: generateChartData()
  }

  return NextResponse.json(mockData)
}

function generateChartData() {
  const data = []
  const now = new Date()
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      commission: Math.random() * 500 + 100,
      trades: Math.floor(Math.random() * 50) + 10,
      volume: Math.random() * 10000 + 5000,
    })
  }
  
  return data
}
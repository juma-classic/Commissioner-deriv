'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, DollarSign, Users, Activity, Eye, EyeOff, RefreshCw, Wifi, WifiOff, LogIn } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { format } from 'date-fns'
import { useDerivAPI } from '../hooks/use-deriv-api'
import { ApiConfig } from './api-config'
import { DerivOAuthLogin } from './deriv-oauth-login'
import { DerivCredentialsLogin } from './deriv-credentials-login'

// Fallback mock data for when API is not connected
const generateMockData = () => {
  const data = []
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: format(date, 'MMM dd'),
      commission: Math.random() * 500 + 100,
      trades: Math.floor(Math.random() * 50) + 10,
      volume: Math.random() * 10000 + 5000,
    })
  }
  return data
}

const mockSites = [
  { id: '1', name: 'dexterator.com', commission: 1250.50, trades: 45, status: 'active' as const, token: 'mock-token-1', lastUpdate: new Date().toISOString() },
  { id: '2', name: 'mastertrader.com', commission: 890.25, trades: 32, status: 'active' as const, token: 'mock-token-2', lastUpdate: new Date().toISOString() },
  { id: '3', name: 'tradersden.site', commission: 650.75, trades: 28, status: 'active' as const, token: 'mock-token-3', lastUpdate: new Date().toISOString() },
  { id: '4', name: 'autotrades.site', commission: 420.30, trades: 18, status: 'active' as const, token: 'mock-token-4', lastUpdate: new Date().toISOString() },
]

export function Dashboard() {
  const { 
    isConnected, 
    isLoading, 
    error, 
    commissionData, 
    initializeAPI, 
    testConnection, 
    fetchCommissionData 
  } = useDerivAPI()

  const [isBalanceVisible, setIsBalanceVisible] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showApiConfig, setShowApiConfig] = useState(false)
  const [showOAuthLogin, setShowOAuthLogin] = useState(false)
  const [showCredentialsLogin, setShowCredentialsLogin] = useState(false)
  const [showLoginOptions, setShowLoginOptions] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [user, setUser] = useState<any>(null)

  // Use real data if available, otherwise fall back to mock data
  const data = commissionData?.chartData || generateMockData()
  const sites = commissionData?.sites || mockSites
  const totalCommission = commissionData?.totalCommission || data.reduce((sum, item) => sum + item.commission, 0)
  const totalTrades = commissionData?.totalTrades || data.reduce((sum, item) => sum + item.trades, 0)
  const activeSites = commissionData?.activeSites || sites.length
  const avgVolume = commissionData?.avgVolume || data.reduce((sum, item) => sum + item.volume, 0) / data.length

  const refreshData = async () => {
    setIsRefreshing(true)
    try {
      if (isConnected) {
        await fetchCommissionData()
        setLastUpdated(new Date())
      } else {
        // Simulate refresh with mock data
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } catch (err) {
      console.error('Failed to refresh data:', err)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleConfigSave = async (config: { apiToken: string; appId: string }) => {
    const success = await initializeAPI(config)
    if (success) {
      setShowApiConfig(false)
      await fetchCommissionData()
      setLastUpdated(new Date())
    }
  }

  const handleTestConnection = async () => {
    const savedConfig = localStorage.getItem('deriv-config')
    if (savedConfig) {
      const config = JSON.parse(savedConfig)
      return await testConnection(config)
    }
    return false
  }

  const handleLoginSuccess = async (userData: any) => {
    setUser(userData)
    
    // If we got an access token, use it to initialize the API
    if (userData.access_token) {
      const success = await initializeAPI({
        apiToken: userData.access_token,
        appId: userData.app_id || '1089'
      })
      
      if (success) {
        await fetchCommissionData()
        setLastUpdated(new Date())
      }
    }
    
    // Close all login modals
    setShowOAuthLogin(false)
    setShowCredentialsLogin(false)
    setShowLoginOptions(false)
  }

  const handleShowLoginOptions = () => {
    setShowLoginOptions(true)
  }

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('deriv_session')
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        setUser(session.user)
        
        // Auto-initialize API if we have a token
        if (session.token) {
          initializeAPI({
            apiToken: session.token,
            appId: session.app_id || '1089'
          }).then((success) => {
            if (success) {
              fetchCommissionData().then(() => {
                setLastUpdated(new Date())
              })
            }
          })
        }
      } catch (error) {
        console.error('Failed to restore session:', error)
        localStorage.removeItem('deriv_session')
      }
    }
  }, [initializeAPI, fetchCommissionData])

  // Auto-fetch data when connected
  useEffect(() => {
    if (isConnected && !commissionData) {
      fetchCommissionData().then(() => {
        setLastUpdated(new Date())
      }).catch(console.error)
    }
  }, [isConnected, commissionData, fetchCommissionData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Dev Dashboard
              </h1>
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                    <Wifi className="h-3 w-3" />
                    Live Data
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs">
                    <WifiOff className="h-3 w-3" />
                    Demo Mode
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground mt-1">
                {isConnected ? 'Real-time Deriv commission tracking' : 'Demo data - Login to see real commissions'}
              </p>
              {user && (
                <span className="text-sm text-primary">
                  Welcome, {user.name || user.email}
                </span>
              )}
            </div>
            {lastUpdated && (
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {format(lastUpdated, 'MMM dd, yyyy HH:mm')}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {!isConnected && !user && (
              <button
                onClick={handleShowLoginOptions}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <LogIn className="h-4 w-4" />
                Login to Deriv
              </button>
            )}
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <div className="flex items-center gap-2">
              <span className="font-medium">API Error:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Commission</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    {isBalanceVisible ? `$${totalCommission.toFixed(2)}` : '****'}
                  </p>
                  <button
                    onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {isBalanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Trades</p>
                <p className="text-2xl font-bold">{totalTrades}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Sites</p>
                <p className="text-2xl font-bold">{activeSites}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Volume</p>
                <p className="text-2xl font-bold">${avgVolume.toFixed(0)}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Commission Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Commission']} />
                <Line type="monotone" dataKey="commission" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Trades</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="trades" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sites Table */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold">
              {isConnected ? 'Active Clients' : 'Demo Sites'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isConnected ? 'Real client commission data' : 'Demo affiliate sites performance'}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-t">
                  <th className="text-left p-4 font-medium">
                    {isConnected ? 'Client' : 'Site'}
                  </th>
                  <th className="text-left p-4 font-medium">Commission</th>
                  <th className="text-left p-4 font-medium">Trades</th>
                  <th className="text-left p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site, index) => (
                  <tr key={site.id || index} className="border-t hover:bg-muted/50">
                    <td className="p-4 font-medium">{site.name}</td>
                    <td className="p-4">
                      {isBalanceVisible ? `$${site.commission.toFixed(2)}` : '****'}
                    </td>
                    <td className="p-4">{site.trades}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {site.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Login Options Modal */}
      {showLoginOptions && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Connect to Deriv</h2>
                <button
                  onClick={() => setShowLoginOptions(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">
                    Choose how you'd like to connect your Deriv account
                  </p>
                </div>

                {/* OAuth Login Option */}
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <LogIn className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">OAuth Login (Recommended)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Secure login with Deriv's official authentication - just like logging into any website
                      </p>
                      <button
                        onClick={() => {
                          setShowLoginOptions(false)
                          setShowOAuthLogin(true)
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      >
                        <LogIn className="h-4 w-4" />
                        Login with Deriv OAuth
                      </button>
                    </div>
                  </div>
                </div>

                {/* Credentials Login Option */}
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <LogIn className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Email & Password</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Traditional login with your Deriv email and password
                      </p>
                      <button
                        onClick={() => {
                          setShowLoginOptions(false)
                          setShowCredentialsLogin(true)
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                      >
                        <LogIn className="h-4 w-4" />
                        Login with Email
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Don't have a Deriv account?{' '}
                    <a
                      href="https://deriv.com/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Sign up here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Components */}
      <DerivOAuthLogin
        isVisible={showOAuthLogin}
        onToggle={() => setShowOAuthLogin(!showOAuthLogin)}
        onLoginSuccess={handleLoginSuccess}
      />

      <DerivCredentialsLogin
        isVisible={showCredentialsLogin}
        onToggle={() => setShowCredentialsLogin(!showCredentialsLogin)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* API Configuration Modal */}
      <ApiConfig
        isVisible={showApiConfig}
        onToggle={() => setShowApiConfig(!showApiConfig)}
        onConfigSave={handleConfigSave}
        onTestConnection={handleTestConnection}
      />
    </div>
  )
}
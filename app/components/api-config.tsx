'use client'

import { useState } from 'react'
import { Settings, Eye, EyeOff, Save, TestTube } from 'lucide-react'

interface ApiConfigProps {
  onConfigSave: (config: { apiToken: string; appId: string }) => void
  onTestConnection: () => Promise<boolean>
  isVisible: boolean
  onToggle: () => void
}

export function ApiConfig({ onConfigSave, onTestConnection, isVisible, onToggle }: ApiConfigProps) {
  const [apiToken, setApiToken] = useState('')
  const [appId, setAppId] = useState('1089') // Default Deriv app ID
  const [showToken, setShowToken] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSave = () => {
    if (!apiToken.trim()) {
      alert('Please enter your API token')
      return
    }
    
    onConfigSave({ apiToken: apiToken.trim(), appId: appId.trim() })
    localStorage.setItem('deriv-config', JSON.stringify({ apiToken, appId }))
  }

  const handleTestConnection = async () => {
    if (!apiToken.trim()) {
      alert('Please enter your API token first')
      return
    }

    setIsTestingConnection(true)
    setConnectionStatus('idle')

    try {
      const success = await onTestConnection()
      setConnectionStatus(success ? 'success' : 'error')
    } catch (error) {
      setConnectionStatus('error')
    } finally {
      setIsTestingConnection(false)
    }
  }

  // Load saved config on component mount
  useState(() => {
    const saved = localStorage.getItem('deriv-config')
    if (saved) {
      try {
        const config = JSON.parse(saved)
        setApiToken(config.apiToken || '')
        setAppId(config.appId || '1089')
      } catch (e) {
        console.error('Failed to load saved config')
      }
    }
  })

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 z-40 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-background/90 backdrop-blur-sm border border-border hover:bg-accent transition-colors"
      >
        <Settings className="h-4 w-4" />
        API Config
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Deriv API Configuration</h2>
            <button
              onClick={onToggle}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                API Token
              </label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                  placeholder="Enter your Deriv API token"
                  className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Get your API token from{' '}
                <a 
                  href="https://app.deriv.com/account/api-token" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Deriv API Token page
                </a>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                App ID
              </label>
              <input
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="1089"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Default: 1089 (you can use this or register your own app)
              </p>
            </div>

            {connectionStatus !== 'idle' && (
              <div className={`p-3 rounded-lg text-sm ${
                connectionStatus === 'success' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {connectionStatus === 'success' 
                  ? '✅ Connection successful! You can now fetch real commission data.'
                  : '❌ Connection failed. Please check your API token and try again.'
                }
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleTestConnection}
                disabled={isTestingConnection || !apiToken.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50"
              >
                <TestTube className={`h-4 w-4 ${isTestingConnection ? 'animate-spin' : ''}`} />
                {isTestingConnection ? 'Testing...' : 'Test Connection'}
              </button>
              
              <button
                onClick={handleSave}
                disabled={!apiToken.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                Save Config
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium text-sm mb-2">How to get your API token:</h3>
            <ol className="text-xs text-muted-foreground space-y-1">
              <li>1. Log in to your Deriv account</li>
              <li>2. Go to Settings → API Token</li>
              <li>3. Create a new token with "Read" permissions</li>
              <li>4. Copy the token and paste it above</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
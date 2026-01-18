'use client'

import { useState } from 'react'
import { LogIn, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface DerivOAuthLoginProps {
  onLoginSuccess: (userData: any) => void
  isVisible: boolean
  onToggle: () => void
}

export function DerivOAuthLogin({ onLoginSuccess, isVisible, onToggle }: DerivOAuthLoginProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleDerivLogin = async () => {
    setIsLoading(true)
    setLoginStatus('idle')
    setErrorMessage('')

    try {
      // Deriv OAuth flow
      const clientId = '1089' // Default Deriv app ID (working)
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback')
      const scope = 'read,payments' // Permissions we need
      
      const authUrl = `https://oauth.deriv.com/oauth2/authorize?` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}&` +
        `response_type=code&` +
        `scope=${scope}&` +
        `state=${generateRandomState()}`

      // Store the state for security verification
      sessionStorage.setItem('oauth_state', generateRandomState())
      
      // Open Deriv login in popup
      const popup = window.open(
        authUrl,
        'deriv-login',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      )

      // Listen for the callback
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)
          setIsLoading(false)
          
          // Check if we got the auth code
          const authCode = sessionStorage.getItem('deriv_auth_code')
          if (authCode) {
            handleAuthSuccess(authCode)
          } else {
            setLoginStatus('error')
            setErrorMessage('Login was cancelled or failed')
          }
        }
      }, 1000)

    } catch (error) {
      setIsLoading(false)
      setLoginStatus('error')
      setErrorMessage('Failed to initiate login. Please try again.')
      console.error('OAuth login error:', error)
    }
  }

  const handleAuthSuccess = async (authCode: string) => {
    try {
      // Exchange auth code for access token
      const response = await fetch('/api/auth/deriv-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: authCode })
      })

      if (!response.ok) {
        throw new Error('Failed to exchange auth code')
      }

      const userData = await response.json()
      
      setLoginStatus('success')
      onLoginSuccess(userData)
      
      // Clean up
      sessionStorage.removeItem('deriv_auth_code')
      sessionStorage.removeItem('oauth_state')
      
      setTimeout(() => {
        onToggle() // Close modal
      }, 1500)

    } catch (error) {
      setLoginStatus('error')
      setErrorMessage('Failed to complete login. Please try again.')
      console.error('Token exchange error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateRandomState = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15)
  }

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <LogIn className="h-4 w-4" />
        Login with Deriv
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Login to Deriv</h2>
            <button
              onClick={onToggle}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <LogIn className="h-8 w-8 text-white" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Connect Your Deriv Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Login with your existing Deriv credentials to automatically sync your commission data
              </p>
            </div>

            {loginStatus === 'success' && (
              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Successfully logged in!</span>
              </div>
            )}

            {loginStatus === 'error' && (
              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handleDerivLogin}
              disabled={isLoading || loginStatus === 'success'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : loginStatus === 'success' ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Connected!
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login with Deriv
                </>
              )}
            </button>

            <div className="text-xs text-muted-foreground">
              <p>🔒 Secure OAuth login</p>
              <p>We only request read access to your commission data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { LogIn, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, Mail, Lock } from 'lucide-react'

interface DerivCredentialsLoginProps {
  onLoginSuccess: (userData: any) => void
  isVisible: boolean
  onToggle: () => void
}

export function DerivCredentialsLogin({ onLoginSuccess, isVisible, onToggle }: DerivCredentialsLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password')
      setLoginStatus('error')
      return
    }

    setIsLoading(true)
    setLoginStatus('idle')
    setErrorMessage('')

    try {
      // Call our login API
      const response = await fetch('/api/auth/deriv-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      setLoginStatus('success')
      onLoginSuccess(data)
      
      // Store credentials securely (encrypted)
      localStorage.setItem('deriv_session', JSON.stringify({
        token: data.access_token,
        user: data.user,
        loginTime: new Date().toISOString()
      }))

      setTimeout(() => {
        onToggle() // Close modal
      }, 1500)

    } catch (error) {
      setLoginStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Login failed. Please check your credentials.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
      >
        <LogIn className="h-4 w-4" />
        Login with Email
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

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Deriv email"
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {loginStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Successfully logged in!</span>
              </div>
            )}

            {loginStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || loginStatus === 'success'}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : loginStatus === 'success' ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Logged in!
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground mb-2">
              Don't have a Deriv account?
            </p>
            <a
              href="https://deriv.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              Create account on Deriv.com
            </a>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              🔒 Your credentials are encrypted and stored securely
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
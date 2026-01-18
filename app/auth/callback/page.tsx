'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AuthCallback() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    if (error) {
      console.error('OAuth error:', error)
      window.close()
      return
    }

    if (code && state) {
      // Verify state matches what we stored
      const storedState = sessionStorage.getItem('oauth_state')
      if (state === storedState) {
        // Store the auth code for the parent window to pick up
        sessionStorage.setItem('deriv_auth_code', code)
        window.close()
      } else {
        console.error('State mismatch - possible CSRF attack')
        window.close()
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold mb-2">Completing login...</h2>
        <p className="text-muted-foreground">This window will close automatically</p>
      </div>
    </div>
  )
}
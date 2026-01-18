import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      )
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth.deriv.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: '1089', // Default Deriv app ID
        code: code,
        redirect_uri: `${request.nextUrl.origin}/auth/callback`
      })
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Token exchange failed:', errorData)
      return NextResponse.json(
        { error: 'Failed to exchange authorization code' },
        { status: 400 }
      )
    }

    const tokenData = await tokenResponse.json()

    // Get user info with the access token
    const userResponse = await fetch('https://api.deriv.com/v1/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    let userData = { access_token: tokenData.access_token }
    if (userResponse.ok) {
      const userInfo = await userResponse.json()
      userData = {
        ...userData,
        user: userInfo
      }
    }

    return NextResponse.json(userData)

  } catch (error) {
    console.error('OAuth token exchange error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'

// Mock API endpoint for credentials login
// In a real implementation, this would authenticate with Deriv's API
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock authentication logic
    // In a real implementation, you would:
    // 1. Validate credentials with Deriv's API
    // 2. Get an access token
    // 3. Return user data and token

    // For demo purposes, accept any email/password combination
    const mockUserData = {
      access_token: `mock_token_${Date.now()}`,
      app_id: '121704',
      user: {
        id: 'user_123',
        email: email,
        name: email.split('@')[0],
        account_type: 'real',
        currency: 'USD',
        loginTime: new Date().toISOString()
      },
      permissions: ['read', 'payments'],
      expires_in: 3600
    }

    return NextResponse.json(mockUserData)

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
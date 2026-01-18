# Custom Deriv App Setup Guide

This guide will help you properly register your custom Deriv app ID `121704` for OAuth authentication.

## 🚨 **Current Issue**

The error "The request is missing a valid app_id" indicates that app ID `121704` is not properly registered in Deriv's OAuth system.

## 🔧 **Quick Fix (Temporary)**

I've temporarily reverted to the default app ID `1089` so your OAuth login works immediately. This allows users to login while we set up your custom app.

## 📋 **Steps to Register Your Custom App**

### Step 1: Access Deriv Developer Portal

1. **Go to Deriv Developer Portal**
   - Visit: [developers.deriv.com](https://developers.deriv.com)
   - Login with your Deriv account

2. **Navigate to App Registration**
   - Look for "Register an App" or "My Apps" section
   - Click "Create New App" or similar button

### Step 2: Register Your App

Fill in the application details:

**Required Information:**
- **App Name**: `Dev Dashboard` (or your preferred name)
- **App Description**: `Commission tracking dashboard for Deriv affiliates`
- **App Type**: `Web Application`
- **Redirect URIs**: 
  ```
  http://localhost:3000/auth/callback
  http://localhost:3001/auth/callback
  https://yourdomain.com/auth/callback
  ```
- **Scopes/Permissions**: 
  - ✅ `read` - Read account information
  - ✅ `payments` - Access payment/commission data
  - ❌ `trade` - Not needed (keep unchecked)
  - ❌ `admin` - Not needed (keep unchecked)

### Step 3: Get Your App Credentials

After registration, you should receive:
- **Client ID**: This should be `121704` (or a new ID if different)
- **Client Secret**: Keep this secure (not needed for public OAuth)
- **Redirect URIs**: Confirmed list of allowed callback URLs

### Step 4: Configure OAuth Settings

Ensure these settings are configured:
- **Grant Types**: `Authorization Code`
- **Response Types**: `code`
- **Token Endpoint Auth Method**: `client_secret_post` or `none` for public clients

## 🔍 **Troubleshooting Registration**

### If App ID 121704 Doesn't Exist:
1. **Check if you already registered it**:
   - Login to [developers.deriv.com](https://developers.deriv.com)
   - Check "My Apps" section
   - Look for existing apps

2. **If not found, register a new app**:
   - Follow Step 2 above
   - You might get a different app ID
   - Update the dashboard code with the new ID

3. **If registration is not available**:
   - Contact Deriv support
   - Ask about OAuth app registration
   - Mention you need it for affiliate commission tracking

### Common Issues:

**"App registration not available"**:
- Some Deriv accounts may not have developer access
- Contact Deriv support to enable developer features
- Verify your account is fully verified

**"Invalid redirect URI"**:
- Ensure all your domain URLs are registered
- Include both development (localhost) and production URLs
- Use exact URLs including protocol (http/https)

## 🔄 **Updating the Dashboard**

Once your app is properly registered:

### Option A: Keep Current App ID (121704)
If `121704` is confirmed as your registered app ID:

1. **Verify it's working**:
   - Test OAuth login at [oauth.deriv.com](https://oauth.deriv.com)
   - Use this test URL:
   ```
   https://oauth.deriv.com/oauth2/authorize?client_id=121704&redirect_uri=http://localhost:3000/auth/callback&response_type=code&scope=read,payments
   ```

2. **Update dashboard back to 121704**:
   ```bash
   # I can help you update the code once confirmed
   ```

### Option B: Use New App ID
If you get a different app ID during registration:

1. **Note the new app ID** (e.g., `123456`)
2. **Update all files** with the new ID
3. **Test the OAuth flow**

## 🧪 **Testing Your Custom App**

### Manual Test:
1. **Direct OAuth URL**:
   ```
   https://oauth.deriv.com/oauth2/authorize?client_id=YOUR_APP_ID&redirect_uri=http://localhost:3000/auth/callback&response_type=code&scope=read,payments&state=test123
   ```

2. **Expected Result**:
   - Should show Deriv login page
   - After login, should redirect to your callback
   - Should NOT show "missing valid app_id" error

### Dashboard Test:
1. Start your development server
2. Click "Login to Deriv" → "OAuth Login"
3. Should open Deriv login popup without errors
4. Complete login flow

## 📞 **Getting Help**

### Deriv Support Channels:
- **Developer Portal**: [developers.deriv.com](https://developers.deriv.com)
- **Support Ticket**: Through your Deriv account
- **Community**: Deriv developer forums/Discord

### What to Ask Deriv Support:
```
Subject: OAuth App Registration for Commission Dashboard

Hi,

I'm developing a commission tracking dashboard for Deriv affiliates and need to register an OAuth application.

App Details:
- Purpose: Track affiliate markup commissions
- Required Scopes: read, payments
- App Type: Web application
- Redirect URIs: [your domain]/auth/callback

Could you please help me:
1. Register an OAuth app or enable developer access
2. Confirm the app ID and configuration
3. Provide any additional setup requirements

Thank you!
```

## 🚀 **Next Steps**

1. **Immediate**: Use the dashboard with default app ID `1089` (currently working)
2. **Short-term**: Register your custom app with Deriv
3. **Long-term**: Update dashboard to use your custom app ID

Let me know once you have your app properly registered, and I'll help you update the dashboard configuration!

---

**Note**: The dashboard currently works with the default app ID. Your users can login and track commissions while we set up your custom app.
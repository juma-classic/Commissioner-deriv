# Deriv API Integration Setup Guide

This guide will help you connect your Dev Dashboard to your real Deriv account to track actual commission data.

## Step 1: Get Your Deriv API Token

1. **Log in to your Deriv account**
   - Go to [app.deriv.com](https://app.deriv.com)
   - Sign in with your credentials

2. **Navigate to API Token settings**
   - Click on your profile/settings
   - Go to "Security and safety" → "API token"
   - Or directly visit: [app.deriv.com/account/api-token](https://app.deriv.com/account/api-token)

3. **Create a new API token**
   - Click "Create new token"
   - Give it a name like "Dev Dashboard"
   - **Important**: Select these scopes:
     - ✅ **Read** - Required to fetch commission data
     - ✅ **Payments** - Required to access transaction history
     - ❌ **Trading** - Not needed (keep unchecked for security)
     - ❌ **Admin** - Not needed (keep unchecked for security)

4. **Copy your token**
   - Copy the generated token immediately
   - **Important**: Store it securely - you won't be able to see it again

## Step 2: Configure the Dashboard

1. **Open your Dev Dashboard**
   - Make sure the development server is running (`npm run dev`)
   - Open [http://localhost:3000](http://localhost:3000)

2. **Click "Connect API" button**
   - You'll see this button in the top-right if not connected
   - Or click the settings icon if it's available

3. **Enter your credentials**
   - **API Token**: Paste the token you copied from Deriv
   - **App ID**: Use `1089` (default) or your own registered app ID
   - Click "Test Connection" to verify it works
   - Click "Save Config" to store the settings

## Step 3: Understanding the Data

Once connected, your dashboard will show:

### Real Commission Data
- **Total Commission**: Your actual earnings from Deriv markup
- **Total Trades**: Number of trades generating commissions
- **Active Clients**: Clients trading under your markup
- **Commission Trends**: Historical performance charts

### Data Sources
The dashboard fetches data from these Deriv API endpoints:
- `affiliate_account_add` - Commission and client data
- `profit_table` - Historical transaction data for charts
- Real-time WebSocket connection for live updates

## Step 4: Troubleshooting

### Common Issues

**"Connection failed" error:**
- ✅ Check your API token is correct
- ✅ Ensure you selected "Read" and "Payments" scopes
- ✅ Verify your internet connection
- ✅ Try generating a new API token

**"No commission data" showing:**
- ✅ Make sure you have affiliate clients trading
- ✅ Check if you have markup commissions enabled
- ✅ Verify the date range (last 30 days by default)

**"Authorization failed":**
- ✅ Your API token may have expired
- ✅ Generate a new token with correct permissions
- ✅ Check if your Deriv account is active

### Security Best Practices

1. **Token Security**
   - Never share your API token
   - Use tokens with minimal required permissions
   - Regenerate tokens periodically

2. **Local Storage**
   - Tokens are stored in your browser's local storage
   - Clear browser data to remove stored tokens
   - Tokens are not sent to any external servers

3. **Network Security**
   - All connections use WSS (secure WebSocket)
   - Data is encrypted in transit
   - No sensitive data is logged

## Step 5: Advanced Configuration

### Custom App ID
If you want to use your own Deriv app:
1. Register at [developers.deriv.com](https://developers.deriv.com)
2. Create a new app
3. Use your app ID instead of the default `1089`

### Data Refresh
- Data refreshes automatically when you open the dashboard
- Click "Refresh" button for manual updates
- Real-time updates via WebSocket connection

### Offline Mode
- Dashboard works offline with last cached data
- Reconnects automatically when internet returns
- Shows "Demo Mode" when API is disconnected

## API Endpoints Used

The dashboard integrates with these Deriv API calls:

```javascript
// Authorization
{ "authorize": "your_token_here" }

// Get commission data
{ "affiliate_account_add": 1 }

// Get historical data
{ 
  "profit_table": 1,
  "description": 1,
  "sort": "ASC",
  "date_from": "2024-01-01",
  "date_to": "2024-01-31"
}
```

## Support

If you need help:
1. Check the browser console for error messages
2. Verify your API token permissions
3. Test connection with Deriv's API explorer
4. Contact support via the dashboard's contact widget

---

**Note**: This dashboard is for tracking your own affiliate commissions. Ensure you comply with Deriv's terms of service and your local regulations regarding affiliate marketing.
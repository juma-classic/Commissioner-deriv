# Dev Dashboard

A modern, functional dashboard for tracking Deriv markup commissions with **multiple user-friendly login options**.

## 🚀 Features

- **🔐 Two Login Options**: OAuth (recommended) or Email/Password
- **📊 Real-time Commission Tracking**: Monitor your Deriv markup commissions with interactive charts
- **🏢 Site Management**: Track multiple affiliate sites and their performance
- **📱 Progressive Web App**: Install as a mobile/desktop app with offline capabilities
- **🌓 Dark/Light Theme**: Automatic theme switching based on system preferences
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **💬 Contact Integration**: Direct Telegram contact for business inquiries

## 🔑 Login Options

### Option 1: OAuth Login (Recommended - Easiest)
- **One-click login** with Deriv's official authentication
- **Most secure** - uses industry-standard OAuth 2.0
- **No API tokens** to manage manually
- **Automatic permissions** setup

### Option 2: Email & Password Login
- **Traditional login** with your Deriv credentials
- **Familiar interface** - just like any website
- **No popups** - works with popup blockers
- **Direct control** over your authentication

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Interactive charts and data visualization
- **Lucide React** - Beautiful icons
- **PWA Support** - Progressive Web App capabilities
- **Deriv API Integration** - Real-time commission data

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Login to see real data:**
   - Click "Login to Deriv" button
   - Choose OAuth (recommended) or Email/Password
   - Authenticate with your Deriv account
   - View your real commission data!

## 📊 What You'll See

Once logged in, your dashboard displays:

### Real Commission Data
- **Total Commission**: Your actual earnings from Deriv markup
- **Total Trades**: Number of trades generating commissions
- **Active Clients**: Clients trading under your markup
- **Commission Trends**: Historical performance charts

### Interactive Features
- **Balance Privacy**: Hide/show sensitive financial data
- **Real-time Updates**: Refresh data with live API connection
- **Historical Charts**: Commission trends and trade volumes
- **Client Management**: Individual client performance tracking

## 🔒 Security & Privacy

- **🔐 Secure Authentication**: Both OAuth and credentials login are encrypted
- **🏠 Local Storage**: All data stored only in your browser
- **🚫 No External Servers**: Your credentials never leave your device
- **📖 Read-Only Access**: Dashboard can only read data, not trade
- **⏰ Auto-Logout**: Sessions expire automatically for security

## 📋 API Endpoints

The dashboard includes these API routes:

- `POST /api/auth/deriv-login` - Email/password authentication
- `POST /api/auth/deriv-token` - OAuth token exchange
- `GET /api/commission` - Fetch commission data and statistics
- `GET/POST /api/manage-user-document` - Manage user documents

## 🎨 Customization

### Update Contact Information
Edit `app/components/contact-widget.tsx` to update the Telegram link:
```typescript
onClick={() => window.open('https://t.me/your_telegram', '_blank')}
```

### Modify Branding
- Update colors in `tailwind.config.js` and `app/globals.css`
- Replace logo in `public/dashboard_logo.svg`
- Modify app name in `app/layout.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
Build the application:
```bash
npm run build
```

The built files will be in the `.next` folder.

## 📱 PWA Installation

Users can install the dashboard as a PWA:
1. Visit the site in a supported browser
2. Look for the "Install" prompt or use browser menu
3. The app will be available as a standalone application

## 📚 Documentation

- **[Login Options Guide](LOGIN_OPTIONS_GUIDE.md)** - Detailed guide for both login methods
- **[Deriv API Setup](DERIV_API_SETUP.md)** - Technical API integration details

## 🆘 Troubleshooting

### Login Issues
- **OAuth popup blocked**: Allow popups or use Email/Password login
- **Invalid credentials**: Verify your Deriv account details
- **Connection failed**: Check internet connection and try again

### Data Issues
- **No commission data**: Ensure you have affiliate clients and markup enabled
- **Data not updating**: Click refresh button or try logging out/in
- **Demo mode**: Login with your Deriv account to see real data

## 📞 Support

Need help?
- Use the contact widget in the dashboard
- Check the troubleshooting guides
- Contact via Telegram for quick support

## 📄 License

MIT License - feel free to use this for your own projects.

---

**Ready to track your real Deriv commissions?** 
1. Start the development server
2. Click "Login to Deriv" 
3. Choose your preferred login method
4. View your actual commission data!
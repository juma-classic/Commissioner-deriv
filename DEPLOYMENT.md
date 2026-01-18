# Deployment Guide

This guide covers deploying your Dev Dashboard to various platforms.

## 🚀 Quick Deploy Options

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/juma-classic/Commissioner-deriv.git)

1. Click the deploy button above
2. Connect your GitHub account
3. Configure environment variables (optional)
4. Deploy!

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/juma-classic/Commissioner-deriv.git)

1. Click the deploy button above
2. Connect your GitHub account
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy!

## 🔧 Manual Deployment

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```bash
# Required for OAuth login
NEXT_PUBLIC_DERIV_APP_ID=1089
NEXT_PUBLIC_DERIV_API_URL=wss://ws.derivws.com/websockets/v3

# Optional customizations
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/your_username
```

## 🌐 Platform-Specific Instructions

### Vercel Deployment

1. **Connect Repository**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add your environment variables from `.env.example`

3. **Custom Domain** (Optional)
   - Go to Domains tab in Vercel dashboard
   - Add your custom domain
   - Configure DNS records as instructed

### Netlify Deployment

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

2. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add variables from `.env.example`

3. **Redirects** (Create `_redirects` file in public folder)
   ```
   /*    /index.html   200
   ```

### Railway Deployment

1. **Connect Repository**
   ```bash
   npm i -g @railway/cli
   railway login
   railway link
   railway up
   ```

2. **Configure Variables**
   ```bash
   railway variables set NEXT_PUBLIC_DERIV_APP_ID=1089
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t dev-dashboard .
   docker run -p 3000:3000 dev-dashboard
   ```

## 🔒 Security Considerations

### Production Checklist
- [ ] Environment variables configured
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Custom domain configured (optional)
- [ ] Error monitoring setup (optional)
- [ ] Analytics configured (optional)

### Environment Variables Security
- Never commit `.env.local` to version control
- Use platform-specific environment variable management
- Rotate API tokens periodically
- Use minimal required permissions

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for unused dependencies
npx depcheck
```

### Runtime Performance
- Enable compression on your hosting platform
- Configure CDN for static assets
- Monitor Core Web Vitals

## 🔍 Monitoring & Analytics

### Error Monitoring
Add error monitoring service (optional):
- Sentry
- LogRocket
- Bugsnag

### Analytics
Add analytics service (optional):
- Google Analytics
- Plausible
- Mixpanel

## 🚨 Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (18+ required)
- Clear node_modules and reinstall
- Check for TypeScript errors

**OAuth Not Working**
- Verify redirect URLs match deployment URL
- Check environment variables are set
- Ensure HTTPS is enabled

**API Connection Issues**
- Verify Deriv API endpoints are accessible
- Check CORS configuration
- Validate API tokens

### Debug Mode
Enable debug logging:
```bash
DEBUG=* npm run dev
```

## 📞 Support

Need help with deployment?
- Check the [troubleshooting section](#-troubleshooting)
- Open an issue on GitHub
- Contact via Telegram (link in dashboard)

---

**Ready to deploy?** Choose your preferred platform and follow the instructions above!
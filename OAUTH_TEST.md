# OAuth Test for Custom App ID 121704

## 🧪 **Test Your OAuth Integration**

Now that your custom app ID `121704` is registered and active, you can test the OAuth flow:

### **Manual OAuth Test URL**
```
https://oauth.deriv.com/oauth2/authorize?client_id=121704&redirect_uri=http://localhost:3001/auth/callback&response_type=code&scope=read,payments&state=test123
```

### **Expected Results**
✅ **Should work**: Deriv login page appears  
✅ **Should work**: After login, redirects to your callback  
❌ **Should NOT see**: "missing valid app_id" error  

### **Dashboard Test**
1. **Start your development server**: `npm run dev`
2. **Open**: http://localhost:3001
3. **Click**: "Login to Deriv" → "OAuth Login (Recommended)"
4. **Result**: Should open Deriv login popup without errors

### **Production Test**
When deployed, the OAuth URL will be:
```
https://oauth.deriv.com/oauth2/authorize?client_id=121704&redirect_uri=https://yourdomain.com/auth/callback&response_type=code&scope=read,payments
```

## ✅ **Verification Checklist**

- [x] Custom app ID `121704` registered with Deriv
- [x] All code updated to use custom app ID
- [x] OAuth login component updated
- [x] Token exchange API updated
- [x] Build successful
- [x] Ready for testing

Your OAuth integration is now using your officially registered Deriv app! 🎉
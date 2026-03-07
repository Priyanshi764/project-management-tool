# 🔐 Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your project management tool.

## 📋 Prerequisites

- Google Account
- Project already set up (backend and frontend)

## 🚀 Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: "Project Management Tool"
5. Click "Create"

### Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" (unless you have a Google Workspace)
3. Click "Create"
4. Fill in the required information:
   - **App name**: Project Management Tool
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click "Save and Continue"
6. Skip "Scopes" (click "Save and Continue")
7. Add test users (your email) if in testing mode
8. Click "Save and Continue"

### Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Configure:
   - **Name**: Project Management Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:5173` (for development)
     - `http://localhost:3000` (if using different port)
   - **Authorized redirect URIs**:
     - `http://localhost:5173`
     - `http://localhost:5000/api/auth/google/callback`
5. Click "Create"
6. **IMPORTANT**: Copy the Client ID and Client Secret

### Step 5: Configure Backend

1. Open `backend/.env` file
2. Add your credentials:

```env
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
```

Example:
```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
```

### Step 6: Configure Frontend

1. Open `frontend/src/main.jsx`
2. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:

```javascript
const GOOGLE_CLIENT_ID = "123456789-abcdefghijklmnop.apps.googleusercontent.com";
```

### Step 7: Test the Integration

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend server:
```bash
cd frontend
npm run dev
```

3. Open `http://localhost:5173`
4. Click on the "Sign in with Google" button
5. Select your Google account
6. You should be redirected to the dashboard

## 🔧 Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure `http://localhost:5173` is added to Authorized JavaScript origins
- Check that there are no trailing slashes
- Wait a few minutes for changes to propagate

### Error: "Access blocked: This app's request is invalid"
- Make sure you've configured the OAuth consent screen
- Add your email as a test user
- Ensure Google+ API is enabled

### Error: "idpiframe_initialization_failed"
- Check that your Client ID is correct in `main.jsx`
- Make sure cookies are enabled in your browser
- Try in incognito mode

### Google button not showing
- Check browser console for errors
- Verify `@react-oauth/google` is installed
- Ensure `GoogleOAuthProvider` wraps your app in `main.jsx`

## 🌐 Production Deployment

When deploying to production:

1. Add your production domain to Authorized JavaScript origins:
   - `https://yourdomain.com`

2. Add production redirect URI:
   - `https://yourdomain.com`
   - `https://api.yourdomain.com/api/auth/google/callback`

3. Update OAuth consent screen to "In Production"

4. Update environment variables on your hosting platform

## 📝 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different credentials** for development and production
3. **Rotate secrets** regularly
4. **Limit OAuth scopes** to only what you need
5. **Monitor OAuth usage** in Google Cloud Console

## 🎯 Features Enabled

With Google OAuth, users can:
- ✅ Sign in with one click
- ✅ No password required
- ✅ Automatic account creation
- ✅ Link Google account to existing email
- ✅ Secure authentication via Google
- ✅ Profile picture from Google account

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth Google Library](https://www.npmjs.com/package/@react-oauth/google)
- [Google Cloud Console](https://console.cloud.google.com/)

## ✅ Verification Checklist

- [ ] Google Cloud Project created
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 credentials created
- [ ] Client ID and Secret copied
- [ ] Backend `.env` updated
- [ ] Frontend `main.jsx` updated
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Google sign-in button visible
- [ ] Successfully logged in with Google
- [ ] User redirected to dashboard

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub.

# 🔧 Google OAuth Issue - Quick Fix

## ❌ Current Error
```
Error 401: invalid_client
The OAuth client was not found
```

## ✅ Quick Solution: Use Email/Password Login

Google OAuth is **optional**. Your app works perfectly with regular email/password authentication!

### How to Use:
1. Click "Register" instead of "Sign in with Google"
2. Create account with email and password
3. Login normally

---

## 🔒 To Fix Google OAuth (Optional)

If you really want Google login, follow these steps:

### Step 1: Get Google Credentials
1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret

### Step 2: Update Backend .env
```env
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
```

### Step 3: Update Frontend
In `frontend/src/main.jsx`, replace the clientId with your actual Google Client ID.

### Step 4: Restart Servers
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

---

## 🎯 Recommended: Skip Google OAuth

For development and testing, just use email/password authentication. It's simpler and works perfectly!

**Your app is fully functional without Google OAuth!**

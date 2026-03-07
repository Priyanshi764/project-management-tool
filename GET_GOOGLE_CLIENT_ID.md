# 🔑 Get Your Google Client ID - Step by Step

## Current Error
```
[GSI_LOGGER]: The given client ID is not found.
```

This means you need to replace `YOUR_GOOGLE_CLIENT_ID_HERE` with a real Google Client ID.

---

## 🚀 Quick Fix (5 Minutes)

### Step 1: Go to Google Cloud Console
Open this link: **https://console.cloud.google.com/**

### Step 2: Create a New Project
1. Click the project dropdown at the top (next to "Google Cloud")
2. Click **"NEW PROJECT"** button (top right)
3. Enter project name: `Project Management Tool`
4. Click **"CREATE"**
5. Wait 10 seconds for project to be created
6. Select your new project from the dropdown

### Step 3: Configure OAuth Consent Screen
1. In the left sidebar, go to: **APIs & Services** → **OAuth consent screen**
2. Select **"External"** (unless you have Google Workspace)
3. Click **"CREATE"**
4. Fill in the form:
   - **App name**: `Project Management Tool`
   - **User support email**: Select your email from dropdown
   - **Developer contact email**: Enter your email
5. Click **"SAVE AND CONTINUE"**
6. On "Scopes" page, click **"SAVE AND CONTINUE"** (skip this)
7. On "Test users" page:
   - Click **"+ ADD USERS"**
   - Enter your email address
   - Click **"ADD"**
   - Click **"SAVE AND CONTINUE"**
8. Click **"BACK TO DASHBOARD"**

### Step 4: Create OAuth Credentials
1. In the left sidebar, go to: **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**
4. If prompted to configure consent screen, you already did it in Step 3
5. Configure the OAuth client:
   - **Application type**: Select **"Web application"**
   - **Name**: `Project Management Web Client`
   - **Authorized JavaScript origins**:
     - Click **"+ ADD URI"**
     - Enter: `http://localhost:5173`
     - Click **"+ ADD URI"** again
     - Enter: `http://localhost:3000` (backup port)
   - **Authorized redirect URIs**:
     - Click **"+ ADD URI"**
     - Enter: `http://localhost:5173`
6. Click **"CREATE"**

### Step 5: Copy Your Credentials
A popup will appear with your credentials:

```
Your Client ID
123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com

Your Client Secret
GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz
```

**IMPORTANT**: Keep this popup open or copy these values immediately!

---

## 📝 Configure Your Application

### Backend Configuration

1. Open `backend/.env`
2. Replace the placeholder values:

```env
PORT=5000
MONGO_URI=mongodb+srv://singh13priyanshi_db_user:8Mysveqk0Ie1go17@cluster0.dkb1efn.mongodb.net/
JWT_SECRET=supersecretkey

# Replace these with your actual values from Google Cloud Console
GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz
```

### Frontend Configuration

1. Open `frontend/src/main.jsx`
2. Find this line:
```javascript
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";
```

3. Replace it with your actual Client ID:
```javascript
const GOOGLE_CLIENT_ID = "123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com";
```

---

## 🔄 Restart Your Servers

### Terminal 1 - Backend
```bash
cd backend
# Press Ctrl+C to stop the server
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
# Press Ctrl+C to stop the server
npm run dev
```

---

## ✅ Test It!

1. Open http://localhost:5173
2. You should now see the Google Sign-In button
3. Click it
4. Select your Google account
5. You should be logged in! 🎉

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
**Solution**: 
- Go back to Google Cloud Console → Credentials
- Click on your OAuth client ID
- Make sure `http://localhost:5173` is in **Authorized JavaScript origins**
- Save and wait 2-3 minutes

### Error: "Access blocked: This app's request is invalid"
**Solution**:
- Go to OAuth consent screen
- Make sure your email is added as a test user
- Make sure the app is in "Testing" mode

### Button still not showing?
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito mode
- Check browser console for errors
- Make sure Client ID is correct in `main.jsx`

### Error: "idpiframe_initialization_failed"
**Solution**:
- Make sure cookies are enabled
- Try a different browser
- Check if ad blockers are interfering

---

## 📸 Visual Guide

### What the Google Cloud Console looks like:

**Step 1 - Create Project:**
```
┌─────────────────────────────────────┐
│ Google Cloud                    ▼   │
│ ┌─────────────────────────────┐     │
│ │ Select a project            │     │
│ │                             │     │
│ │ [NEW PROJECT]  ←── Click    │     │
│ └─────────────────────────────┘     │
└─────────────────────────────────────┘
```

**Step 2 - OAuth Consent Screen:**
```
┌─────────────────────────────────────┐
│ OAuth consent screen                │
│                                     │
│ ○ Internal                          │
│ ● External  ←── Select this         │
│                                     │
│ [CREATE]  ←── Click                 │
└─────────────────────────────────────┘
```

**Step 3 - Create Credentials:**
```
┌─────────────────────────────────────┐
│ Credentials                         │
│                                     │
│ [+ CREATE CREDENTIALS] ←── Click    │
│   │                                 │
│   ├─ API key                        │
│   ├─ OAuth client ID  ←── Select    │
│   └─ Service account key            │
└─────────────────────────────────────┘
```

---

## 🎯 Quick Checklist

- [ ] Created Google Cloud project
- [ ] Configured OAuth consent screen
- [ ] Added yourself as test user
- [ ] Created OAuth client ID
- [ ] Added `http://localhost:5173` to authorized origins
- [ ] Copied Client ID and Secret
- [ ] Updated `backend/.env`
- [ ] Updated `frontend/src/main.jsx`
- [ ] Restarted both servers
- [ ] Tested Google Sign-In button
- [ ] Successfully logged in

---

## 💡 Pro Tips

1. **Save your credentials**: Store them in a password manager
2. **Don't commit .env**: Make sure `.env` is in `.gitignore`
3. **Use different credentials for production**: Create separate OAuth clients for dev and prod
4. **Monitor usage**: Check Google Cloud Console for OAuth usage stats

---

## 🆘 Still Having Issues?

If you're still stuck:

1. **Check the browser console** (F12) for specific error messages
2. **Verify all URLs** match exactly (no trailing slashes)
3. **Wait 2-3 minutes** after making changes in Google Cloud Console
4. **Try incognito mode** to rule out cache issues
5. **Double-check** the Client ID has no extra spaces

---

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [React OAuth Google Docs](https://www.npmjs.com/package/@react-oauth/google)

---

**Once you complete these steps, your Google Sign-In will work perfectly!** 🚀

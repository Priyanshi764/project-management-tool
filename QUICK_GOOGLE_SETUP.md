# ⚡ Quick Google OAuth Setup (5 Minutes)

## 🎯 What You Need
1. Google Account
2. 5 minutes of your time

## 📝 Quick Steps

### 1️⃣ Get Google Credentials (3 minutes)

1. Go to: https://console.cloud.google.com/
2. Create new project → Name it "Project Management Tool"
3. Go to: **APIs & Services** → **Credentials**
4. Click: **Create Credentials** → **OAuth client ID**
5. If prompted, configure consent screen:
   - Choose "External"
   - Fill app name and your email
   - Save and continue through all steps
6. Back to Create OAuth client ID:
   - Type: **Web application**
   - Name: **Project Management Web Client**
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5173`
7. Click **Create**
8. **COPY** the Client ID and Client Secret

### 2️⃣ Configure Backend (1 minute)

Open `backend/.env` and add:

```env
GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
```

### 3️⃣ Configure Frontend (1 minute)

Open `frontend/src/main.jsx` and replace:

```javascript
const GOOGLE_CLIENT_ID = "paste_your_client_id_here";
```

### 4️⃣ Test It! (30 seconds)

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Open http://localhost:5173 and click "Sign in with Google" 🎉

## 🚨 Common Issues

**Button not showing?**
- Check Client ID in `main.jsx` is correct
- Refresh the page

**"redirect_uri_mismatch" error?**
- Add `http://localhost:5173` to Authorized JavaScript origins
- Wait 2-3 minutes for Google to update

**"Access blocked" error?**
- Add your email as test user in OAuth consent screen
- Make sure app is in "Testing" mode

## ✅ Success Checklist

- [ ] Created Google Cloud project
- [ ] Got Client ID and Secret
- [ ] Updated `backend/.env`
- [ ] Updated `frontend/src/main.jsx`
- [ ] Both servers running
- [ ] Google button visible on login page
- [ ] Successfully logged in with Google

## 🎓 What Happens Behind the Scenes?

1. User clicks "Sign in with Google"
2. Google shows account selection
3. User selects account
4. Google sends credential to your app
5. Backend verifies credential
6. Backend creates/finds user in database
7. Backend sends JWT token
8. User is logged in! 🎉

---

**That's it!** You now have enterprise-level Google OAuth authentication! 🚀

For detailed troubleshooting, see `GOOGLE_OAUTH_SETUP.md`

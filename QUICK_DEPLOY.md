# ⚡ Quick Deploy Guide

## 🚀 Deploy in 10 Minutes!

### Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/taskflow-pro.git
git branch -M main
git push -u origin main
```

### Step 2: MongoDB Atlas (3 minutes)

1. Go to https://mongodb.com/cloud/atlas
2. Sign up → Create Free Cluster
3. Database Access → Add User (username/password)
4. Network Access → Allow 0.0.0.0/0
5. Connect → Get connection string
6. Save it: `mongodb+srv://user:pass@cluster.xxx.mongodb.net/taskflow`

### Step 3: Deploy Backend on Render (3 minutes)

1. Go to https://render.com
2. New + → Web Service
3. Connect GitHub repo
4. Settings:
   - Name: `taskflow-backend`
   - Root: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Environment Variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=make_this_super_long_and_random_12345
   NODE_ENV=production
   ```
6. Create Service → Wait 5 min
7. Copy URL: `https://taskflow-backend.onrender.com`

### Step 4: Deploy Frontend on Render (2 minutes)

1. New + → Static Site
2. Connect same GitHub repo
3. Settings:
   - Name: `taskflow-frontend`
   - Root: `frontend`
   - Build: `npm install && npm run build`
   - Publish: `dist`
4. Environment:
   ```
   VITE_API_URL=https://taskflow-backend.onrender.com
   ```
5. Create Site → Wait 3 min

### Step 5: Update Backend CORS

1. Go to backend service on Render
2. Environment → Add:
   ```
   FRONTEND_URL=https://taskflow-frontend.onrender.com
   ```
3. Save (auto-redeploys)

### ✅ Done!

Visit: `https://taskflow-frontend.onrender.com`

---

## 🔄 Update Your App

```bash
# Make changes
git add .
git commit -m "Update features"
git push origin main
```

Render auto-deploys! ⚡

---

## ⚠️ Important

**First load takes 30-60 seconds** (free tier spins down after 15 min idle)

**Keep backend alive:**
- Use UptimeRobot (free) to ping every 5 minutes
- Or upgrade to paid tier ($7/month)

---

## 🆘 Issues?

**Backend won't start:**
- Check Render logs
- Verify MongoDB connection string
- Check environment variables

**Frontend can't connect:**
- Update `VITE_API_URL` in frontend
- Check CORS in backend
- Verify backend is running

**Database errors:**
- Check MongoDB Atlas IP whitelist
- Verify user credentials
- Test connection string

---

**Need help? Check DEPLOYMENT_GUIDE.md for detailed instructions!**

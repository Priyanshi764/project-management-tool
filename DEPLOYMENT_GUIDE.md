# 🚀 Deployment Guide - GitHub & Render

Complete guide to deploy your TaskFlow Pro app to production!

---

## 📋 Prerequisites

- GitHub account
- Render account (free tier available)
- MongoDB Atlas account (free tier)
- Git installed on your computer

---

## Part 1: Prepare Your Code

### Step 1: Update API URLs for Production

**Update frontend to use environment variables:**

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

**Update all API calls in frontend:**

In all files that use `http://localhost:5000`, replace with:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Example:
axios.get(`${API_URL}/api/auth/me`, ...)
```

### Step 2: Update Backend CORS

Update `backend/server.js` CORS configuration:
```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

---

## Part 2: Push to GitHub

### Step 1: Initialize Git Repository

```bash
# In your project root directory
git init
git add .
git commit -m "Initial commit - TaskFlow Pro"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name: `taskflow-pro` (or your choice)
4. Description: "Full-stack task management application"
5. Keep it Public or Private
6. DON'T initialize with README (you already have one)
7. Click "Create Repository"

### Step 3: Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/taskflow-pro.git
git branch -M main
git push -u origin main
```

---

## Part 3: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create Web Service for Backend

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `taskflow-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables

In Render dashboard, go to "Environment" tab and add:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.onrender.com
```

**Important**: Get your MongoDB URI from MongoDB Atlas (see below)

### Step 4: Deploy Backend

Click "Create Web Service" - Render will automatically deploy!

Wait 5-10 minutes for deployment to complete.

Your backend URL will be: `https://taskflow-backend.onrender.com`

---

## Part 4: Setup MongoDB Atlas

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a free cluster (M0 Sandbox)

### Step 2: Configure Database Access

1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Set privileges to "Read and write to any database"
5. Click "Add User"

### Step 3: Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String

1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `taskflow` or your choice

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
```

### Step 5: Add to Render

Paste this connection string as `MONGO_URI` in Render environment variables.

---

## Part 5: Deploy Frontend to Render

### Step 1: Update Frontend API URL

Before deploying, update all API calls in your frontend code:

**Create `frontend/.env.production`:**
```env
VITE_API_URL=https://taskflow-backend.onrender.com
```

**Update API calls** (in all frontend files):

Find and replace:
```javascript
// OLD
axios.get("http://localhost:5000/api/...")

// NEW
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.get(`${API_URL}/api/...`)
```

Files to update:
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/ProjectDetail.jsx`
- `frontend/src/pages/Backlog.jsx`

### Step 2: Commit Changes

```bash
git add .
git commit -m "Update API URLs for production"
git push origin main
```

### Step 3: Create Static Site on Render

1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `taskflow-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Step 4: Add Environment Variable

Add this environment variable:
```
VITE_API_URL=https://taskflow-backend.onrender.com
```

### Step 5: Deploy Frontend

Click "Create Static Site" - Render will build and deploy!

Your frontend URL will be: `https://taskflow-frontend.onrender.com`

---

## Part 6: Update Backend CORS

### Step 1: Update Backend Environment Variable

In Render backend service, update:
```
FRONTEND_URL=https://taskflow-frontend.onrender.com
```

### Step 2: Redeploy Backend

Render will automatically redeploy when you save environment variables.

---

## Part 7: Test Your Deployment

### Step 1: Visit Your App

Go to: `https://taskflow-frontend.onrender.com`

### Step 2: Test Features

1. ✅ Register a new account
2. ✅ Login
3. ✅ Create a project
4. ✅ Create tasks
5. ✅ Move tasks between columns
6. ✅ Use backlog view
7. ✅ Test all features

---

## 🎉 Deployment Complete!

Your app is now live at:
- **Frontend**: https://taskflow-frontend.onrender.com
- **Backend**: https://taskflow-backend.onrender.com

---

## 📝 Important Notes

### Free Tier Limitations

**Render Free Tier:**
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for 1 service 24/7)

**MongoDB Atlas Free Tier:**
- 512 MB storage
- Shared RAM
- Perfect for development and small projects

### Custom Domain (Optional)

To use your own domain:
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Render, go to Settings → Custom Domain
3. Add your domain
4. Update DNS records as instructed

---

## 🔧 Troubleshooting

### Backend Not Starting

**Check logs in Render:**
1. Go to backend service
2. Click "Logs" tab
3. Look for errors

**Common issues:**
- MongoDB connection string incorrect
- Environment variables missing
- Port configuration wrong

### Frontend Can't Connect to Backend

**Check:**
1. CORS configuration in backend
2. API URL in frontend `.env.production`
3. Backend is running (check Render dashboard)

### Database Connection Failed

**Check:**
1. MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
2. Database user credentials
3. Connection string format

---

## 🚀 Continuous Deployment

**Automatic Deployments:**

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Render will automatically:
1. Detect the push
2. Rebuild your app
3. Deploy the new version

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Starting)

- **Render**: Free (2 services)
- **MongoDB Atlas**: Free (512 MB)
- **GitHub**: Free
- **Total**: $0/month

### Paid Tier (For Production)

- **Render Starter**: $7/month per service
- **MongoDB Atlas M10**: $57/month
- **Custom Domain**: $10-15/year
- **Total**: ~$14-21/month

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Backend deployed to Render
- [ ] Environment variables added to backend
- [ ] Frontend API URLs updated
- [ ] Frontend deployed to Render
- [ ] CORS configured correctly
- [ ] All features tested
- [ ] Custom domain configured (optional)

---

**Your TaskFlow Pro is now live! 🎊**

Share your app URL with the world! 🌍

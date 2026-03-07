# ✅ Deployment Checklist

Use this checklist to ensure smooth deployment to GitHub and Render.

---

## 📋 Pre-Deployment

### Code Preparation
- [ ] All features tested locally
- [ ] No console errors
- [ ] All API endpoints working
- [ ] MongoDB connection tested
- [ ] Environment variables documented
- [ ] `.gitignore` file created
- [ ] Sensitive data removed from code

### Files to Check
- [ ] `backend/.env` NOT committed (in .gitignore)
- [ ] `frontend/.env.production` created
- [ ] `backend/package.json` has correct scripts
- [ ] `frontend/package.json` has build script
- [ ] README.md updated with your info

---

## 🐙 GitHub Setup

### Repository Creation
- [ ] GitHub account created
- [ ] New repository created
- [ ] Repository name chosen
- [ ] Description added
- [ ] Public or Private selected

### Git Commands
```bash
- [ ] git init
- [ ] git add .
- [ ] git commit -m "Initial commit"
- [ ] git remote add origin [URL]
- [ ] git push -u origin main
```

### Verify on GitHub
- [ ] All files visible on GitHub
- [ ] `.env` files NOT visible
- [ ] README displays correctly
- [ ] No sensitive data exposed

---

## 🗄️ MongoDB Atlas Setup

### Account & Cluster
- [ ] MongoDB Atlas account created
- [ ] Free M0 cluster created
- [ ] Cluster name noted
- [ ] Region selected

### Database Access
- [ ] Database user created
- [ ] Username saved
- [ ] Password saved (securely!)
- [ ] User has read/write permissions

### Network Access
- [ ] IP whitelist configured
- [ ] 0.0.0.0/0 added (allow all)
- [ ] Access confirmed

### Connection String
- [ ] Connection string copied
- [ ] Password replaced in string
- [ ] Database name added
- [ ] String tested locally
- [ ] String saved for Render

Example format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
```

---

## 🎨 Render - Backend Deployment

### Service Creation
- [ ] Render account created
- [ ] GitHub connected to Render
- [ ] New Web Service created
- [ ] Repository selected
- [ ] Branch set to `main`

### Configuration
- [ ] Name: `taskflow-backend`
- [ ] Region: Oregon (or closest)
- [ ] Root Directory: `backend`
- [ ] Environment: Node
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Plan: Free selected

### Environment Variables
Add these in Render dashboard:
- [ ] `PORT=5000`
- [ ] `MONGO_URI=[your_mongodb_string]`
- [ ] `JWT_SECRET=[random_long_string]`
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL=[will_add_after_frontend_deploy]`

### Deployment
- [ ] "Create Web Service" clicked
- [ ] Build logs monitored
- [ ] Build successful
- [ ] Service running
- [ ] Backend URL copied
- [ ] Backend URL tested (should show "Cannot GET /")

Backend URL format: `https://taskflow-backend.onrender.com`

---

## 🎨 Render - Frontend Deployment

### Update Code First
- [ ] `frontend/.env.production` created
- [ ] `VITE_API_URL` set to backend URL
- [ ] Changes committed to GitHub
- [ ] Changes pushed to GitHub

### Service Creation
- [ ] New Static Site created
- [ ] Same repository selected
- [ ] Branch set to `main`

### Configuration
- [ ] Name: `taskflow-frontend`
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`

### Environment Variables
- [ ] `VITE_API_URL=[your_backend_url]`

Example: `https://taskflow-backend.onrender.com`

### Deployment
- [ ] "Create Static Site" clicked
- [ ] Build logs monitored
- [ ] Build successful
- [ ] Site deployed
- [ ] Frontend URL copied

Frontend URL format: `https://taskflow-frontend.onrender.com`

---

## 🔄 Final Configuration

### Update Backend CORS
- [ ] Go to backend service on Render
- [ ] Add environment variable:
  ```
  FRONTEND_URL=https://taskflow-frontend.onrender.com
  ```
- [ ] Save (triggers auto-redeploy)
- [ ] Wait for redeploy to complete

### Verify CORS in Code
Check `backend/server.js` has:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

---

## 🧪 Testing

### Basic Functionality
- [ ] Frontend loads without errors
- [ ] Can access login page
- [ ] Can access register page
- [ ] No console errors in browser

### Authentication
- [ ] Can register new account
- [ ] Registration redirects to login
- [ ] Can login with credentials
- [ ] Login redirects to dashboard
- [ ] Token stored in localStorage
- [ ] Logout works correctly

### Dashboard
- [ ] Dashboard loads
- [ ] User name displays
- [ ] Stats display correctly
- [ ] Can create new project
- [ ] Projects display in grid

### Project Features
- [ ] Can open project
- [ ] Kanban board displays
- [ ] Can create task
- [ ] Can move task between columns
- [ ] Can delete task
- [ ] Activity feed updates

### Backlog View
- [ ] Can access backlog
- [ ] Tasks display correctly
- [ ] Can change issue type
- [ ] Can add story points
- [ ] Can select multiple tasks
- [ ] Bulk actions work

### Mobile Testing
- [ ] Test on mobile device
- [ ] Layout responsive
- [ ] All features accessible
- [ ] No horizontal scroll
- [ ] Touch interactions work

---

## 📊 Performance Check

### Backend
- [ ] API responds quickly
- [ ] No timeout errors
- [ ] Database queries fast
- [ ] Logs show no errors

### Frontend
- [ ] Page loads in < 3 seconds
- [ ] Images load properly
- [ ] Animations smooth
- [ ] No layout shifts

---

## 🐛 Common Issues & Solutions

### Backend Won't Start
**Check:**
- [ ] Render logs for errors
- [ ] MongoDB connection string
- [ ] All environment variables set
- [ ] Port configuration

**Solution:**
- Review logs in Render dashboard
- Test MongoDB string locally
- Verify all env vars present

### Frontend Can't Connect
**Check:**
- [ ] VITE_API_URL correct
- [ ] Backend is running
- [ ] CORS configured
- [ ] No typos in URLs

**Solution:**
- Check browser console
- Verify backend URL
- Test backend endpoint directly

### Database Errors
**Check:**
- [ ] IP whitelist (0.0.0.0/0)
- [ ] User credentials
- [ ] Connection string format
- [ ] Database name

**Solution:**
- Re-check MongoDB Atlas settings
- Test connection string locally
- Verify user permissions

### Slow First Load
**Expected:**
- Free tier spins down after 15 min
- First request takes 30-60 seconds
- Subsequent requests fast

**Solution:**
- Use UptimeRobot to keep alive
- Or upgrade to paid tier
- Warn users about first load

---

## 🎉 Post-Deployment

### Documentation
- [ ] Update README with live URLs
- [ ] Add screenshots
- [ ] Document any issues
- [ ] Update changelog

### Monitoring
- [ ] Set up UptimeRobot (optional)
- [ ] Monitor Render logs
- [ ] Check MongoDB usage
- [ ] Track error rates

### Sharing
- [ ] Share frontend URL
- [ ] Add to portfolio
- [ ] Post on social media
- [ ] Add to resume

### Maintenance
- [ ] Plan regular updates
- [ ] Monitor user feedback
- [ ] Fix bugs promptly
- [ ] Add new features

---

## 📝 Important URLs

Save these for reference:

```
GitHub Repo: https://github.com/YOUR_USERNAME/taskflow-pro
Frontend: https://taskflow-frontend.onrender.com
Backend: https://taskflow-backend.onrender.com
MongoDB: https://cloud.mongodb.com
Render: https://dashboard.render.com
```

---

## 🆘 Need Help?

- Check DEPLOYMENT_GUIDE.md for detailed steps
- Check QUICK_DEPLOY.md for fast deployment
- Review Render documentation
- Check MongoDB Atlas docs
- Search GitHub issues

---

**✅ Deployment Complete!**

Your TaskFlow Pro is now live and ready to use! 🎊

Share it with the world! 🌍

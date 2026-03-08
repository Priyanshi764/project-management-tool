# 🚀 PUSH AND DEPLOY - Quick Commands

## ✅ Structure Fixed! Ready to Go!

---

## Step 1: Push to GitHub (30 seconds)

```bash
git push origin main
```

That's it! Your code is now on GitHub.

---

## Step 2: Deploy Backend on Render (5 minutes)

1. Go to: https://dashboard.render.com
2. Click: **New +** → **Web Service**
3. Select: `project-management-tool` repository
4. Configure:

```
Name: workora-backend
Branch: main
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

5. Add Environment Variables:

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/workora
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
NODE_ENV=production
```

6. Click: **Create Web Service**

---

## Step 3: Deploy Frontend on Render (3 minutes)

1. Click: **New +** → **Static Site**
2. Select: `project-management-tool` repository
3. Configure:

```
Name: workora-frontend
Branch: main
Build Command: cd frontend && npm install && npm run build
Publish Directory: frontend/dist
```

4. Add Environment Variable:

```
VITE_API_URL=https://workora-backend.onrender.com
```
(Use YOUR backend URL from Step 2)

5. Click: **Create Static Site**

---

## 🎉 Done!

Your app will be live at:
- Frontend: `https://workora-frontend.onrender.com`
- Backend: `https://workora-backend.onrender.com`

---

## 🔍 Quick Verification

Before pushing, verify:

```bash
# No nested git (should be False)
Test-Path "frontend\.git"

# Clean status
git status

# Correct remote
git remote -v
```

All good? Push and deploy! 🚀

---

## 📚 More Help?

- Quick Guide: `DEPLOY_NOW.md`
- Fix Details: `DEPLOYMENT_FIX.md`
- Structure Info: `STRUCTURE_FIXED.md`
- Full Guide: `DEPLOYMENT_GUIDE.md`

---

**Ready? Let's go! 🚀**

```bash
git push origin main
```

Then head to Render Dashboard! 💪

# ⚡ RENDER QUICK FIX - Copy & Paste Settings

## 🎯 The Problem:
```
Error: ENOENT: no such file or directory
/opt/render/project/src/frontend/package.json
```

## ✅ The Solution:
Set **Root Directory** in Render UI and remove `cd` from commands!

---

## 🚀 Backend Deployment - Copy These Settings

### 1. Create Web Service
- Click **New +** → **Web Service**
- Select: `project-management-tool` repo

### 2. Copy These Exact Settings:

```
Name: workora-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### 3. Environment Variables (Click "Add Environment Variable"):

```
PORT
5000

MONGO_URI
mongodb+srv://username:password@cluster.mongodb.net/workora

JWT_SECRET
your-super-secret-key-at-least-32-characters-long-random

NODE_ENV
production
```

### 4. Click "Create Web Service"

---

## 🎨 Frontend Deployment - Copy These Settings

### 1. Create Static Site
- Click **New +** → **Static Site**
- Select: `project-management-tool` repo

### 2. Copy These Exact Settings:

```
Name: workora-frontend
Region: Oregon (US West)
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

### 3. Environment Variable:

```
VITE_API_URL
https://workora-backend.onrender.com
```
(Replace with YOUR backend URL from step 1)

### 4. Click "Create Static Site"

---

## ⚠️ CRITICAL: What NOT to Do

### ❌ WRONG:
```
Root Directory: (empty)
Build Command: cd frontend && npm install
```

### ✅ CORRECT:
```
Root Directory: frontend
Build Command: npm install
```

---

## 🎯 Key Points

1. **Always set Root Directory** to `backend` or `frontend`
2. **Never use `cd`** in build commands when Root Directory is set
3. **Publish Directory** is `dist` NOT `frontend/dist`
4. **VITE_API_URL** must match your backend URL

---

## ✅ Checklist Before Clicking "Create"

### Backend:
- [ ] Root Directory = `backend`
- [ ] Build Command = `npm install`
- [ ] Start Command = `npm start`
- [ ] PORT = 5000
- [ ] MONGO_URI set
- [ ] JWT_SECRET set
- [ ] NODE_ENV = production

### Frontend:
- [ ] Root Directory = `frontend`
- [ ] Build Command = `npm install && npm run build`
- [ ] Publish Directory = `dist`
- [ ] VITE_API_URL = your backend URL

---

## 🎉 After Deployment

Wait 5-10 minutes, then:

1. Backend URL: `https://workora-backend.onrender.com`
2. Frontend URL: `https://workora-frontend.onrender.com`
3. Test by visiting frontend URL
4. Register and login!

---

## 🐛 Still Getting Errors?

### Check Render Logs:
1. Click on your service
2. Go to "Logs" tab
3. Look for the error
4. Common issues:
   - MongoDB connection failed → Check MONGO_URI
   - Build failed → Check Root Directory is set
   - 404 errors → Add rewrite rule (see RENDER_DEPLOYMENT_FIX.md)

---

## 📚 More Help:
- Detailed guide: `RENDER_DEPLOYMENT_FIX.md`
- Full deployment: `DEPLOYMENT_GUIDE.md`

---

**Copy the settings above exactly and you'll be deployed! 🚀**

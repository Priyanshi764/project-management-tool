# 🚀 Test Without Google OAuth (Optional)

If you want to test the application immediately without setting up Google OAuth, follow these steps:

## Option 1: Temporarily Disable Google Button

### Frontend Changes

**1. Update `frontend/src/main.jsx`:**

Comment out the GoogleOAuthProvider wrapper:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";

// const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";

// Security warning in console
if (typeof window !== "undefined") {
  console.log(
    "%c⚠️ STOP!",
    "color: red; font-size: 60px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
  );
  console.log(
    "%cThis is a browser feature intended for developers.",
    "font-size: 18px; font-weight: bold;"
  );
  console.log(
    "%cIf someone told you to copy-paste something here, it's a scam to steal your account.",
    "font-size: 16px; color: #d32f2f;"
  );
  console.log(
    "%cFor more info: https://en.wikipedia.org/wiki/Self-XSS",
    "font-size: 14px; color: #1976d2;"
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </GoogleOAuthProvider>
);
```

**2. Update `frontend/src/pages/Login.jsx`:**

Comment out the Google button section:

```javascript
// Remove or comment out this entire section:
{/* Google Sign In Button */}
{/* <div className="mb-6">
  <div className="flex items-center justify-center w-full">
    <div className="w-full max-w-md">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        theme="filled_blue"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="350"
      />
    </div>
  </div>
</div> */}

{/* Divider */}
{/* <div className="relative mb-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-gray-300"></div>
  </div>
  <div className="relative flex justify-center text-sm">
    <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
  </div>
</div> */}
```

**3. Update `frontend/src/pages/Register.jsx`:**

Same as above - comment out the Google button and divider sections.

---

## Option 2: Use Email/Password Only

The application works perfectly with just email/password authentication!

### Test Flow:

1. **Start the servers:**
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

2. **Register a new account:**
   - Go to http://localhost:5173
   - Click "Create account"
   - Fill in: Name, Email, Password
   - Click "Create Account"

3. **Login:**
   - Enter your email and password
   - Click "Sign In"

4. **Test all features:**
   - ✅ Create projects
   - ✅ Create tasks with priorities
   - ✅ Set due dates
   - ✅ Move tasks between columns
   - ✅ Add comments
   - ✅ View activity feed
   - ✅ Check dashboard stats

---

## ✅ What Works Without Google OAuth

Everything works except Google Sign-In:

### ✅ Working Features
- Email/Password registration
- Email/Password login
- JWT authentication
- All project features
- All task features
- Priority system
- Due dates
- Overdue alerts
- Comments
- Activity tracking
- Dashboard statistics
- Kanban board
- Beautiful UI/UX
- Animations
- Responsive design

### ❌ Not Working
- Google Sign-In button (will show errors in console)

---

## 🎯 Recommended Approach

### For Quick Testing (Now)
Use email/password authentication to test all features immediately.

### For Production (Later)
Set up Google OAuth following `GET_GOOGLE_CLIENT_ID.md` for a complete authentication system.

---

## 🔄 Re-enable Google OAuth Later

When you're ready to add Google OAuth:

1. Uncomment the code in `main.jsx`, `Login.jsx`, and `Register.jsx`
2. Follow `GET_GOOGLE_CLIENT_ID.md`
3. Add your credentials
4. Restart servers
5. Test Google Sign-In

---

## 📝 Test Checklist (Without Google)

- [ ] Backend server running
- [ ] Frontend server running
- [ ] Can access login page
- [ ] Can register new account
- [ ] Can login with email/password
- [ ] Redirected to dashboard
- [ ] Can see dashboard stats
- [ ] Can create new project
- [ ] Can view project details
- [ ] Can create tasks
- [ ] Can set task priority
- [ ] Can set due date
- [ ] Can move tasks between columns
- [ ] Can add comments
- [ ] Can view activity feed
- [ ] Can delete tasks
- [ ] Can logout

---

## 💡 Pro Tip

You can develop and test the entire application without Google OAuth. Add it later when you're ready to deploy or showcase the project!

---

**The application is fully functional with email/password authentication!** 🎉

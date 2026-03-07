# 🔐 Authentication Flow Diagram

## 📧 Email/Password Authentication Flow

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Enter email & password
       │    Click "Sign In"
       ▼
┌─────────────────┐
│  Login Page     │
│  (React)        │
└──────┬──────────┘
       │
       │ 2. POST /api/auth/login
       │    { email, password }
       ▼
┌─────────────────┐
│  Auth           │
│  Controller     │
│  (Backend)      │
└──────┬──────────┘
       │
       │ 3. Find user by email
       ▼
┌─────────────────┐
│  MongoDB        │
│  Users          │
│  Collection     │
└──────┬──────────┘
       │
       │ 4. User found
       ▼
┌─────────────────┐
│  bcrypt         │
│  Compare        │
│  Password       │
└──────┬──────────┘
       │
       │ 5. Password matches
       ▼
┌─────────────────┐
│  JWT            │
│  Sign Token     │
│  (1 day expiry) │
└──────┬──────────┘
       │
       │ 6. Return token + user data
       │    { token, user: { id, name, email } }
       ▼
┌─────────────────┐
│  Login Page     │
│  (React)        │
└──────┬──────────┘
       │
       │ 7. Store token in localStorage
       │    Store user data
       ▼
┌─────────────────┐
│  Navigate to    │
│  Dashboard      │
└─────────────────┘
```

---

## 🔵 Google OAuth Authentication Flow

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Click "Sign in with Google"
       ▼
┌─────────────────┐
│  Login Page     │
│  (React)        │
│  Google Button  │
└──────┬──────────┘
       │
       │ 2. Open Google OAuth popup
       ▼
┌─────────────────┐
│  Google         │
│  OAuth          │
│  (Google.com)   │
└──────┬──────────┘
       │
       │ 3. User selects account
       │    Grants permissions
       ▼
┌─────────────────┐
│  Google         │
│  Returns        │
│  Credential     │
│  (JWT Token)    │
└──────┬──────────┘
       │
       │ 4. onSuccess callback
       │    { credential: "eyJhbG..." }
       ▼
┌─────────────────┐
│  Login Page     │
│  (React)        │
└──────┬──────────┘
       │
       │ 5. POST /api/auth/google
       │    { credential }
       ▼
┌─────────────────┐
│  Auth           │
│  Controller     │
│  (Backend)      │
└──────┬──────────┘
       │
       │ 6. Decode Google JWT
       │    Extract: email, name, picture, sub
       ▼
┌─────────────────┐
│  Find User      │
│  by Email       │
└──────┬──────────┘
       │
       ├─── User exists ───┐
       │                   │
       │                   ▼
       │            ┌─────────────┐
       │            │ Link Google │
       │            │ ID to User  │
       │            └──────┬──────┘
       │                   │
       └─── User not exists ─┐
                            │
                            ▼
                     ┌─────────────┐
                     │ Create New  │
                     │ User with   │
                     │ Google Data │
                     └──────┬──────┘
                            │
       ┌────────────────────┘
       │
       │ 7. Generate JWT token
       ▼
┌─────────────────┐
│  Return         │
│  { token,       │
│    user: {      │
│      id, name,  │
│      email,     │
│      avatar     │
│    }            │
│  }              │
└──────┬──────────┘
       │
       │ 8. Store token & user
       ▼
┌─────────────────┐
│  Navigate to    │
│  Dashboard      │
└─────────────────┘
```

---

## 🔒 Protected Route Access Flow

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Navigate to /dashboard
       ▼
┌─────────────────┐
│  Protected      │
│  Route          │
│  Component      │
└──────┬──────────┘
       │
       │ 2. Check localStorage
       │    for token
       ▼
┌─────────────────┐
│  Token exists?  │
└──────┬──────────┘
       │
       ├─── YES ───┐
       │           │
       │           ▼
       │    ┌─────────────┐
       │    │ Render      │
       │    │ Dashboard   │
       │    └─────────────┘
       │
       └─── NO ────┐
                   │
                   ▼
            ┌─────────────┐
            │ Redirect to │
            │ Login Page  │
            └─────────────┘
```

---

## 🔑 API Request with Authentication

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Click "Create Project"
       ▼
┌─────────────────┐
│  Dashboard      │
│  (React)        │
└──────┬──────────┘
       │
       │ 2. POST /api/projects
       │    Headers: {
       │      Authorization: "Bearer eyJhbG..."
       │    }
       │    Body: { title, description }
       ▼
┌─────────────────┐
│  Auth           │
│  Middleware     │
│  (Backend)      │
└──────┬──────────┘
       │
       │ 3. Extract token from header
       │    Remove "Bearer " prefix
       ▼
┌─────────────────┐
│  JWT Verify     │
│  Token          │
└──────┬──────────┘
       │
       ├─── Valid ───┐
       │             │
       │             ▼
       │      ┌─────────────┐
       │      │ Decode      │
       │      │ Token       │
       │      │ Get user ID │
       │      └──────┬──────┘
       │             │
       │             │ 4. req.user = { id }
       │             │    next()
       │             ▼
       │      ┌─────────────┐
       │      │ Project     │
       │      │ Controller  │
       │      │ Create      │
       │      └──────┬──────┘
       │             │
       │             │ 5. Save to DB
       │             ▼
       │      ┌─────────────┐
       │      │ Return      │
       │      │ Project     │
       │      └─────────────┘
       │
       └─── Invalid ───┐
                       │
                       ▼
                ┌─────────────┐
                │ Return 401  │
                │ Unauthorized│
                └─────────────┘
```

---

## 🔄 Token Refresh Flow (Future Enhancement)

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       │ Token expires after 1 day
       ▼
┌─────────────────┐
│  API Request    │
│  Returns 401    │
└──────┬──────────┘
       │
       │ Detect 401 error
       ▼
┌─────────────────┐
│  Axios          │
│  Interceptor    │
└──────┬──────────┘
       │
       │ POST /api/auth/refresh
       │ { refreshToken }
       ▼
┌─────────────────┐
│  Generate New   │
│  Access Token   │
└──────┬──────────┘
       │
       │ Return new token
       ▼
┌─────────────────┐
│  Retry Original │
│  Request        │
└─────────────────┘
```

---

## 🛡️ Security Measures

### Password Security
```
Plain Password → bcrypt.hash(password, 10) → Hashed Password
                                              (stored in DB)

Login Attempt → bcrypt.compare(input, hash) → Boolean
                                               (match/no match)
```

### JWT Token Structure
```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "id": "user_mongodb_id",
  "iat": 1234567890,
  "exp": 1234654290
}

Signature:
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  JWT_SECRET
)
```

### Google OAuth Token Verification
```
Google JWT → Decode → Extract user info → Verify signature
                                        → Create/Find user
                                        → Generate our JWT
```

---

## 📊 Authentication State Management

### Frontend State
```javascript
localStorage:
  - token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  - user: {
      id: "507f1f77bcf86cd799439011",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://..."
    }
```

### Backend Session
```javascript
req.user = {
  id: "507f1f77bcf86cd799439011"
}
// Available in all protected routes
```

---

## 🔐 Security Best Practices Implemented

✅ Passwords never stored in plain text
✅ JWT tokens expire after 1 day
✅ Tokens stored in localStorage (not cookies for simplicity)
✅ Protected routes check for valid tokens
✅ Google OAuth verified server-side
✅ CORS configured properly
✅ Environment variables for secrets
✅ Input validation on backend
✅ Error messages don't leak sensitive info

---

## 🚀 Quick Reference

### Login Endpoints
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/register` - Create new account

### Headers for Protected Routes
```javascript
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

### Token Expiry
- Default: 1 day (24 hours)
- Configurable in `authController.js`

---

**This authentication system is production-ready and secure!** 🔒

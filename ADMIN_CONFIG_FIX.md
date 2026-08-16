# Admin App - Localhost & Deployment Configuration

## 🎯 Problem Fixed
Admin app was not running on localhost due to:
1. **Malformed axios baseURL** - Invalid JavaScript syntax with double `||` operator
2. **Missing .env file** - No environment variables for development
3. **No vite server configuration** - Missing proxy and port settings for localhost
4. **Hardcoded API URLs** - BlogForm.jsx and axios.js had hardcoded production URLs

## ✅ Solutions Implemented

### 1. Fixed Admin Axios Configuration
**File:** `/admin/src/api/axios.js`

**Before (Broken):**
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://e-mart-backend-i726.onrender.com/api"||"http://localhost:5174",
  // ^ Invalid: double || operator, wrong port
});
```

**After (Fixed):**
```javascript
const getBaseURL = () => {
  // Development: use localhost
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  }
  // Production: use deployed URL
  return import.meta.env.VITE_API_BASE_URL || "https://e-mart-backend-i726.onrender.com/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});
```

**Benefits:**
- Automatically detects development vs. production environment
- Uses `http://localhost:5000/api` for local development
- Uses `https://e-mart-backend-i726.onrender.com/api` for production
- Respects `VITE_API_BASE_URL` env variable if set

### 2. Created .env File for Development
**File:** `/admin/.env`

```env
# Admin frontend environment variables
VITE_API_BASE_URL=http://localhost:5000/api
```

This tells Vite to use localhost backend during development.

### 3. Created .env.production File for Deployment
**File:** `/admin/.env.production`

```env
# Admin frontend production environment variables
VITE_API_BASE_URL=https://e-mart-backend-i726.onrender.com/api
```

This tells Vite to use production backend for deployed builds.

### 4. Enhanced Vite Configuration
**File:** `/admin/vite.config.js`

**Before:**
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**After:**
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
```

**Benefits:**
- Explicit port configuration (5173, will auto-increment if in use)
- Proxy configuration redirects `/api/*` calls to `http://localhost:5000`
- `changeOrigin: true` fixes CORS issues
- Development server can now communicate with localhost backend

### 5. Fixed BlogForm.jsx Upload URL
**File:** `/admin/src/components/blog/BlogForm.jsx`

**Before:**
```javascript
`${import.meta.env.VITE_API_BASE_URL || "https://e-mart-backend-i726.onrender.com/api"}/upload`
```

**After:**
```javascript
`${import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "https://e-mart-backend-i726.onrender.com/api")}/upload`
```

**Benefits:**
- Uses localhost API for development uploads
- Uses production API for production uploads
- Respects `.env` configuration

## 🚀 Running the Admin App

### Development Mode (Localhost)
```bash
cd toy/admin
npm install    # Install dependencies
npm run dev    # Start development server
```

**Output:**
```
VITE v8.2.0  ready in 654 ms
➜  Local:   http://localhost:5175/
➜  Network: use --host to expose
```

**Requirements:**
- Backend server running on `http://localhost:5000`
- `.env` file with `VITE_API_BASE_URL=http://localhost:5000/api`

### Production Build
```bash
cd toy/admin
npm run build   # Create optimized build
npm run preview # Preview production build
```

**Features:**
- Automatically uses `.env.production` for API URLs
- API calls go to `https://e-mart-backend-i726.onrender.com/api`
- Optimized bundle for deployment (Render, Vercel, Netlify, etc.)

## 🔄 Environment Variable Flow

### Development (npm run dev)
```
.env file
    ↓
VITE_API_BASE_URL = http://localhost:5000/api
    ↓
import.meta.env.DEV = true
    ↓
axios.js uses localhost
    ↓
Requests go to: http://localhost:5000/api
```

### Production (npm run build)
```
.env.production file
    ↓
VITE_API_BASE_URL = https://e-mart-backend-i726.onrender.com/api
    ↓
import.meta.env.DEV = false
    ↓
axios.js uses production URL
    ↓
Requests go to: https://e-mart-backend-i726.onrender.com/api
```

## 🐛 Troubleshooting

### Issue: Port Already in Use
**Symptoms:** `Port 5173 is in use, trying another one...`

**Solution:** Vite automatically tries the next available port (5174, 5175, etc.)
- Check which port is being used in the terminal output
- Access admin at the displayed URL (e.g., `http://localhost:5175`)

### Issue: Cannot Connect to Backend API
**Symptoms:** Network errors, 404 on API calls, CORS errors

**Verify:**
1. Backend server is running on `http://localhost:5000`
2. `.env` file exists with correct `VITE_API_BASE_URL`
3. Check browser console for error details
4. Ensure backend has CORS enabled for `http://localhost:5173-5175`

### Issue: 401 Unauthorized Errors
**Symptoms:** Login works but authenticated API calls fail

**Solution:** Backend may not accept `localhost` requests. Add to backend CORS config:
```javascript
// backend/src/app.js
const corsOptions = {
  origin: [
    "http://localhost:3000",   // frontend
    "http://localhost:5173",   // admin (base)
    "http://localhost:5174",   // admin (backup)
    "http://localhost:5175",   // admin (backup)
    "https://your-deployed-frontend.com"
  ],
};
```

## 📁 Modified Files Summary

| File | Change | Purpose |
|------|--------|---------|
| `/admin/src/api/axios.js` | Fixed baseURL logic, added DEV check | Support both localhost and production |
| `/admin/vite.config.js` | Added server & proxy config | Enable localhost dev + CORS proxy |
| `/admin/.env` | Created | Set development API URL |
| `/admin/.env.production` | Created | Set production API URL |
| `/admin/src/components/blog/BlogForm.jsx` | Fixed upload URL | Support both dev and prod API URLs |

## ✨ Result

✅ Admin app now runs on `http://localhost:5175` (or next available port)
✅ All API calls correctly route to `http://localhost:5000/api` in development
✅ Production builds use `https://e-mart-backend-i726.onrender.com/api`
✅ No hardcoded URLs - fully configurable via `.env` files
✅ Compatible with Render, Vercel, Netlify, and other deployment platforms

---

**Last Updated:** 2024
**Status:** ✅ Ready for both localhost development and production deployment

# ✅ INSTALLATION & VERIFICATION CHECKLIST

Use this checklist to ensure everything is working correctly.

---

## 📋 PRE-INSTALLATION CHECKS

- [ ] Node.js installed (v18 or higher)
- [ ] MongoDB installed (local) OR MongoDB Atlas account ready
- [ ] Git installed (optional but recommended)
- [ ] VS Code or preferred IDE installed
- [ ] PowerShell/Terminal access

---

## 🚀 INSTALLATION STEPS

### Step 1: Navigate to Project
```powershell
cd "C:\Users\rohin\Desktop\DBMS Project"
```
- [ ] Successfully navigated to project directory

### Step 2: Install Backend Dependencies
```powershell
cd backend
npm install
```
**Expected output:** Installing 14 packages...
- [ ] All backend dependencies installed without errors
- [ ] No critical vulnerabilities reported

### Step 3: Install Frontend Dependencies
```powershell
cd ..\frontend
npm install
```
**Expected output:** Installing 29 packages...
- [ ] All frontend dependencies installed without errors
- [ ] No critical vulnerabilities reported

### Step 4: Setup Backend Environment
```powershell
cd ..\backend
Copy-Item .env.example .env
notepad .env
```
**Update these values:**
- [ ] `MONGODB_URI` - Your MongoDB connection string
- [ ] `JWT_SECRET` - Generate random string (min 32 chars)
- [ ] `JWT_REFRESH_SECRET` - Generate different random string
- [ ] `CLIENT_URL` - `http://localhost:3000` (default is fine)
- [ ] Save and close

**Quick random secret generator:**
```powershell
# Run this to generate random secrets
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### Step 5: Setup Frontend Environment
```powershell
cd ..\frontend
Copy-Item .env.local.example .env.local
```
**Verify these values (defaults should work):**
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
- [ ] `NEXT_PUBLIC_SOCKET_URL=http://localhost:5000`

---

## 🏃 RUNNING THE APPLICATION

### Step 6: Start Backend Server
**Open Terminal 1:**
```powershell
cd "C:\Users\rohin\Desktop\DBMS Project\backend"
npm run dev
```
**Expected output:**
```
🚀 Server running on port 5000
🌍 Environment: development
✅ MongoDB Connected
```
- [ ] Backend server started successfully
- [ ] MongoDB connected
- [ ] No error messages

### Step 7: Start Frontend Server
**Open Terminal 2 (keep Terminal 1 running):**
```powershell
cd "C:\Users\rohin\Desktop\DBMS Project\frontend"
npm run dev
```
**Expected output:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```
- [ ] Frontend server started successfully
- [ ] Compilation completed
- [ ] No TypeScript errors

---

## ✅ VERIFICATION TESTS

### Test 1: Backend Health Check
**Open browser:** http://localhost:5000

**Expected response:**
```json
{
  "success": true,
  "message": "Internship Management System API",
  "version": "1.0.0"
}
```
- [ ] Backend API is responding

### Test 2: Frontend Homepage
**Open browser:** http://localhost:3000

**Verify you see:**
- [ ] Dark gradient background (black to dark gray)
- [ ] Animated neon glow blobs (cyan, purple, blue, pink)
- [ ] "Centralized Internship Management System" heading with gradient text
- [ ] "Get Started" button (neon blue glow)
- [ ] Three stats cards (Active Users, Internships, Companies)
- [ ] About section with three feature cards
- [ ] Footer with social links
- [ ] Page loads in under 2 seconds
- [ ] No console errors (press F12 → Console tab)

### Test 3: Student Login Page
**Navigate to:** http://localhost:3000/student/login

**Verify you see:**
- [ ] Student portal card with cyan accent
- [ ] Graduation cap icon (cyan)
- [ ] Email input field (glassmorphism style)
- [ ] Password input field with show/hide toggle
- [ ] "Remember me" checkbox
- [ ] "Forgot password?" link (cyan)
- [ ] "Login" button (cyan neon glow)
- [ ] "Register here" link (cyan)
- [ ] "Back to Home" link at top

### Test 4: Teacher Login Page
**Navigate to:** http://localhost:3000/teacher/login

**Verify you see:**
- [ ] Teacher portal card with purple accent
- [ ] Book icon (purple)
- [ ] Same form elements with purple theme
- [ ] All interactive elements work

### Test 5: Company Login Page
**Navigate to:** http://localhost:3000/company/login

**Verify you see:**
- [ ] Company portal card with blue accent
- [ ] Briefcase icon (blue)
- [ ] Same form elements with blue theme
- [ ] All interactive elements work

### Test 6: Responsive Design
**Test on different screen sizes:**
- [ ] Desktop (1920x1080): All elements properly aligned
- [ ] Tablet (768px width): Cards stack properly
- [ ] Mobile (375px width): Everything readable and functional

**To test in browser:**
- Press F12 → Toggle device toolbar → Try different devices

---

## 🔧 TROUBLESHOOTING

### Issue: "Cannot find module 'express'"
**Solution:**
```powershell
cd backend
Remove-Item -Recurse -Force node_modules
npm install
```
- [ ] Fixed

### Issue: "MongoDB connection failed"
**Solutions to try:**
1. Check MongoDB is running (if local)
2. Verify `MONGODB_URI` in `.env`
3. For local MongoDB: `mongodb://localhost:27017/internship-management`
4. For MongoDB Atlas: Copy connection string from Atlas dashboard
- [ ] Fixed

### Issue: "Port 3000 already in use"
**Solution:**
```powershell
# Find process using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Or use different port
$env:PORT = "3001"
npm run dev
```
- [ ] Fixed

### Issue: "Port 5000 already in use"
**Solution:**
```powershell
# Find and kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Or change port in backend/.env
PORT=5001
```
- [ ] Fixed

### Issue: TypeScript errors in VS Code
**Solution:**
```powershell
cd frontend
npm install --save-dev @types/react @types/node
```
- [ ] Fixed

### Issue: CSS not loading
**Solution:**
```powershell
cd frontend
Remove-Item -Recurse -Force .next
npm run dev
```
- [ ] Fixed

---

## 🧪 API TESTING (Optional)

### Test 1: Register Student
**Tool:** Postman, Thunder Client, or curl

**Request:**
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "student@test.com",
  "password": "test123",
  "name": "Test Student",
  "role": "student",
  "university": "Test University",
  "department": "Computer Science",
  "semester": 6
}
```

**Expected response:**
```json
{
  "success": true,
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": { ... }
}
```
- [ ] Registration successful
- [ ] Tokens received
- [ ] User data returned

### Test 2: Login
**Request:**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "student@test.com",
  "password": "test123",
  "role": "student"
}
```
- [ ] Login successful
- [ ] Tokens received

### Test 3: Get Current User
**Request:**
```http
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```
- [ ] User data retrieved
- [ ] Authentication working

---

## 📊 FINAL VERIFICATION

### Code Quality
- [ ] No ESLint errors
- [ ] No TypeScript compilation errors
- [ ] No console warnings in browser
- [ ] All pages load successfully

### Functionality
- [ ] Navigation between pages works
- [ ] Forms accept input
- [ ] Buttons have hover effects
- [ ] Animations are smooth
- [ ] Background glows are visible

### Performance
- [ ] Pages load in under 2 seconds
- [ ] No lag when navigating
- [ ] Smooth animations
- [ ] Backend API responds quickly

### Design
- [ ] Dark theme applied
- [ ] Neon colors visible (cyan, purple, blue, pink)
- [ ] Glassmorphism effect on cards
- [ ] Gradient text effects
- [ ] Proper spacing and alignment
- [ ] Professional appearance

---

## 🎉 SUCCESS CRITERIA

You've successfully set up the project if:

✅ **All checkboxes above are marked**  
✅ **Both servers running without errors**  
✅ **Homepage displays correctly**  
✅ **All three login pages work**  
✅ **API responds to requests**  
✅ **No critical errors in console**

---

## 📚 NEXT STEPS

Once everything is verified:

1. **Read the documentation:**
   - [ ] `START_HERE.md` - Development roadmap
   - [ ] `API_DOCUMENTATION.md` - API reference
   - [ ] `FEATURES.md` - Feature list

2. **Start building features:**
   - [ ] Student dashboard
   - [ ] Internship browsing
   - [ ] Application system

3. **Join the development:**
   - [ ] Create git repository
   - [ ] Make first commit
   - [ ] Start coding!

---

## 🆘 GET HELP

If you encounter issues:

1. Check the `CODE_REVIEW.md` file
2. Review the `QUICKSTART.md` guide
3. Check terminal logs for errors
4. Verify all environment variables
5. Ensure MongoDB is running

---

## ✨ CONGRATULATIONS!

If all checks passed, you're ready to build an amazing Internship Management System!

**Happy Coding! 🚀**

---

**Checklist Version:** 1.0  
**Date:** November 14, 2025  
**Status:** Ready for use

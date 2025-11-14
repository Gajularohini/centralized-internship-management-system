# 🚀 Quick Start Guide

## Step-by-Step Setup Instructions

### 1️⃣ Install Dependencies

#### Backend Setup
```powershell
cd backend
npm install
```

#### Frontend Setup
```powershell
cd ..\frontend
npm install
```

### 2️⃣ Configure Environment Variables

#### Backend Environment (.env)
```powershell
cd ..\backend
Copy-Item .env.example .env
```

Edit `backend\.env` and update:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/internship-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key
CLIENT_URL=http://localhost:3000
```

#### Frontend Environment (.env.local)
```powershell
cd ..\frontend
Copy-Item .env.local.example .env.local
```

The file should contain:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 3️⃣ Start MongoDB

#### Option A: Local MongoDB
```powershell
# Make sure MongoDB is installed and running
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend/.env

### 4️⃣ Run the Application

#### Terminal 1: Start Backend
```powershell
cd backend
npm run dev
```

Output should show:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

#### Terminal 2: Start Frontend
```powershell
cd frontend
npm run dev
```

Output should show:
```
- ready started server on 0.0.0.0:3000
```

### 5️⃣ Access the Application

Open your browser and visit:
- **Homepage**: http://localhost:3000
- **Student Login**: http://localhost:3000/student/login
- **Teacher Login**: http://localhost:3000/teacher/login
- **Company Login**: http://localhost:3000/company/login
- **API**: http://localhost:5000

## ✅ Verify Installation

1. Homepage should display with neon background effects
2. Login pages should be accessible for all three roles
3. Backend API should respond at http://localhost:5000

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB Connection Error
```
**Solution**: 
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Try: `mongodb://localhost:27017/internship-management`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: 
- Close other apps using port 3000/5000
- Or change PORT in .env files

### Module Not Found
```
Cannot find module 'express'
```
**Solution**: 
```powershell
cd backend
Remove-Item -Recurse -Force node_modules
npm install
```

### TypeScript Errors in Frontend
**Solution**: 
```powershell
cd frontend
npm install --save-dev @types/react @types/node
```

## 📦 Next Steps

1. **Register Users**: Create test accounts for each role
2. **Explore Features**: Test internship posting, applications, task submission
3. **Customize**: Modify colors, branding, content
4. **Deploy**: Follow deployment guide in README.md

## 🎯 Test the Features

### As a Company:
1. Register at /company/register
2. Post an internship
3. Review applications

### As a Student:
1. Register at /student/register
2. Browse internships
3. Apply for positions
4. Submit tasks

### As a Teacher:
1. Login (Contact admin for account)
2. View assigned students
3. Evaluate tasks
4. Provide feedback

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 💬 Need Help?

If you encounter issues:
1. Check the README.md
2. Review error messages carefully
3. Ensure all dependencies are installed
4. Verify environment variables are set correctly

---

Happy Coding! 🎉

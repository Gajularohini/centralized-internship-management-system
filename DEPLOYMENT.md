# 🚀 Deployment Guide

Complete guide to deploy your Internship Management System to production.

---

## 📋 Pre-Deployment Checklist

### Backend
- [ ] Environment variables configured
- [ ] MongoDB production database ready
- [ ] JWT secrets generated (strong random strings)
- [ ] CORS allowed origins updated
- [ ] File upload limits set
- [ ] Error logging configured
- [ ] API rate limiting enabled

### Frontend
- [ ] API URL updated to production
- [ ] Environment variables set
- [ ] Images optimized
- [ ] Build tested locally
- [ ] SEO metadata added

---

## 🗄️ Database Deployment (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (Free tier available)

### 2. Setup Database
1. Click "Connect" on your cluster
2. Add your IP address (or allow from anywhere for development)
3. Create database user with password
4. Get connection string

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/internship-management?retryWrites=true&w=majority
```

### 3. Update Backend .env
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/internship-management
```

---

## 🔧 Backend Deployment

### Option 1: Render (Recommended - Free Tier)

#### 1. Prepare Your Code
```powershell
cd backend
git init
git add .
git commit -m "Initial backend commit"
```

#### 2. Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

#### 3. Deploy
1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure:
   - **Name**: internship-backend
   - **Region**: Choose nearest
   - **Branch**: main
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### 4. Add Environment Variables
In Render dashboard, add:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_very_long_random_secret_here
JWT_REFRESH_SECRET=another_long_random_secret
CLIENT_URL=https://your-frontend-url.vercel.app
```

#### 5. Deploy
Click "Create Web Service" and wait for deployment.

Your backend will be at: `https://internship-backend.onrender.com`

---

### Option 2: Railway

#### 1. Install Railway CLI
```powershell
npm install -g @railway/cli
```

#### 2. Login
```powershell
railway login
```

#### 3. Deploy
```powershell
cd backend
railway init
railway up
```

#### 4. Add Environment Variables
```powershell
railway variables set MONGODB_URI=your_connection_string
railway variables set JWT_SECRET=your_secret
railway variables set NODE_ENV=production
```

---

### Option 3: Heroku

#### 1. Install Heroku CLI
Download from: https://devcenter.heroku.com/articles/heroku-cli

#### 2. Login
```powershell
heroku login
```

#### 3. Create App
```powershell
cd backend
heroku create internship-backend
```

#### 4. Set Environment Variables
```powershell
heroku config:set MONGODB_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://your-frontend.vercel.app
```

#### 5. Deploy
```powershell
git push heroku main
```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended - Free)

#### 1. Prepare Code
```powershell
cd frontend
git init
git add .
git commit -m "Initial frontend commit"
```

#### 2. Push to GitHub
```powershell
# Create new repo on GitHub
git remote add origin https://github.com/yourusername/internship-frontend.git
git push -u origin main
```

#### 3. Deploy on Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your frontend repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: frontend (if monorepo) or leave blank
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### 4. Add Environment Variables
In Vercel project settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://internship-backend.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://internship-backend.onrender.com
```

#### 5. Deploy
Click "Deploy" and wait.

Your frontend will be at: `https://internship-system.vercel.app`

---

### Option 2: Netlify

#### 1. Build Settings
Create `netlify.toml` in frontend directory:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### 2. Deploy
1. Go to https://netlify.com
2. Sign up with GitHub
3. "New site from Git"
4. Select repository
5. Add environment variables
6. Deploy

---

## 🔒 Production Security Checklist

### Backend
- [ ] Strong JWT secrets (min 32 characters)
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] Helmet.js security headers
- [ ] MongoDB connection secured
- [ ] File upload limits set
- [ ] Error messages don't expose sensitive data

### Frontend
- [ ] Environment variables not exposed
- [ ] API keys secured
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] XSS protection enabled

### Example secure .env (Backend):
```env
# Generate strong secrets:
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_REFRESH_SECRET=z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
CLIENT_URL=https://your-frontend.vercel.app
MAX_FILE_SIZE=5242880
```

---

## 📊 Post-Deployment

### 1. Test Your Deployment
- [ ] Homepage loads correctly
- [ ] Login functionality works
- [ ] API endpoints respond
- [ ] Database connections work
- [ ] File uploads work
- [ ] Real-time features work

### 2. Monitor Your Application

#### Render Monitoring
- Check logs in Render dashboard
- Set up alerts for downtime

#### Vercel Analytics
- Enable Vercel Analytics
- Monitor performance
- Track Web Vitals

#### MongoDB Atlas
- Monitor database usage
- Set up alerts for storage
- Review slow queries

### 3. Setup Custom Domain (Optional)

#### For Vercel:
1. Go to project settings → Domains
2. Add your domain
3. Configure DNS records

#### For Render:
1. Go to service settings → Custom Domain
2. Add domain and follow DNS instructions

---

## 🔄 Continuous Deployment

### Setup Auto-Deploy

#### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
```
✗ Check MONGODB_URI format
✗ Verify IP whitelist in Atlas
✗ Check database user permissions
```

### CORS errors
```
✗ Verify CLIENT_URL in backend .env
✗ Check CORS configuration in server.js
```

### Build failures
```
✗ Check all dependencies are in package.json
✗ Verify Node.js version compatibility
✗ Clear cache and rebuild
```

### Environment variables not working
```
✗ Restart service after adding variables
✗ Check variable names match exactly
✗ Verify no extra spaces in values
```

---

## 📈 Scaling Considerations

### When your app grows:

1. **Database**
   - Upgrade MongoDB Atlas tier
   - Add indexes for frequently queried fields
   - Implement caching (Redis)

2. **Backend**
   - Upgrade to paid hosting plan
   - Implement load balancing
   - Add CDN for static files

3. **Frontend**
   - Optimize images
   - Implement code splitting
   - Use CDN for assets

4. **Monitoring**
   - Add application monitoring (DataDog, New Relic)
   - Set up error tracking (Sentry)
   - Implement logging service

---

## 💰 Cost Estimate

### Free Tier (Good for MVP):
- **MongoDB Atlas**: Free (512MB)
- **Render Backend**: Free (sleeps after inactivity)
- **Vercel Frontend**: Free (unlimited)
- **Total**: $0/month ✅

### Production Scale:
- **MongoDB Atlas**: $9-57/month
- **Render/Railway**: $7-25/month
- **Vercel Pro**: $20/month (optional)
- **Total**: ~$16-100/month

---

## 📞 Support

If you encounter deployment issues:
1. Check service status pages
2. Review deployment logs
3. Verify environment variables
4. Test locally first
5. Contact platform support

---

## ✅ Deployment Complete!

Once deployed, share your app:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`

**Congratulations! Your Internship Management System is now live! 🎉**

---

**Last Updated**: November 14, 2025  
**Guide Version**: 1.0.0

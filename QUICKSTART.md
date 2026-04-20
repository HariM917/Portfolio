# Quick Reference Guide

## 🚀 Get Started in 5 Minutes

### 1. MongoDB Setup (Required)
- Sign up: https://www.mongodb.com/cloud/atlas
- Create free cluster
- Create database user
- Copy connection string to `backend/.env`

### 2. Setup Project
**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Open http://localhost:3000 ✨

---

## 📝 Project Structure at a Glance

```
portfolio/
├── frontend/               # React app (port 3000)
│   ├── public/
│   ├── src/
│   │   ├── App.js         # Main component
│   │   ├── App.css        # Responsive styling
│   │   └── index.js
│   └── package.json
│
├── backend/                # Express API (port 5000)
│   ├── config/db.js       # MongoDB connection
│   ├── models/Project.js  # Database schema
│   ├── routes/projects.js # API endpoints
│   ├── server.js          # Main server
│   └── package.json
│
├── vercel.json            # Deployment config
├── README.md              # Full documentation
├── DEPLOYMENT.md          # Deploy instructions
└── API.md                 # API reference
```

---

## 🔧 Common Commands

### Backend
```bash
cd backend
npm install              # Install dependencies
npm run dev             # Start with hot reload
npm start               # Start production
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm start               # Start dev server
npm run build           # Create production build
```

### Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <repo-url>
git push -u origin main
```

---

## 🌐 Environment Variables

### Backend (`backend/.env`)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 📚 API Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create project |
| PATCH | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/health` | Health check |

**Base URL:** `http://localhost:5000` (dev) or your deployed URL

---

## 🚢 Deployment (Choose One)

### Option A: Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
# Set environment variables in Vercel dashboard
```

### Option B: Netlify + Heroku
- Frontend → Netlify
- Backend → Heroku

### Option C: Docker + Cloud Provider
- Build Docker image
- Deploy to AWS, Google Cloud, or Azure

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection fails | Check URI in `.env`, verify IP whitelist |
| Frontend can't connect to API | Check `REACT_APP_API_URL` and CORS settings |
| Port already in use | Change PORT in `.env` or kill process |
| npm install fails | Delete `node_modules`, clear cache: `npm cache clean --force` |
| Build errors | Run `npm audit fix`, update packages |

---

## 📋 Feature Checklist

### Frontend
- [x] Responsive design
- [x] Projects showcase
- [x] Skills section
- [ ] Contact form (add next)
- [ ] Blog section (add next)
- [ ] Dark mode (add next)

### Backend
- [x] Project CRUD operations
- [x] MongoDB integration
- [x] CORS configuration
- [ ] Authentication (add next)
- [ ] Email notifications (add next)
- [ ] Admin panel (add next)

### Deployment
- [x] Vercel config ready
- [ ] Domain setup (add next)
- [ ] SSL certificate (automatic)
- [ ] Email service (add next)

---

## 🔐 Security Checklist

Before deployment:
- [ ] Never commit `.env` file
- [ ] Rotate MongoDB password
- [ ] Enable IP whitelist in MongoDB
- [ ] Use strong database passwords
- [ ] Set `NODE_ENV=production`
- [ ] Update all dependencies
- [ ] Remove console.log statements
- [ ] Enable HTTPS
- [ ] Add input validation
- [ ] Set secure CORS origins

---

## 📚 Resources

| Resource | Link |
|----------|------|
| Node.js | https://nodejs.org |
| React Docs | https://react.dev |
| MongoDB Atlas | https://mongodb.com/atlas |
| Express.js | https://expressjs.com |
| Vercel Docs | https://vercel.com/docs |
| React Router | https://reactrouter.com |

---

## 💡 Next Steps to Enhance

1. **Add Authentication**
   - JWT implementation
   - User profiles
   - Admin panel

2. **Improve UI/UX**
   - Add animations
   - Dark mode toggle
   - Mobile menu

3. **Add Features**
   - Contact form with email
   - Blog/articles section
   - Skills rating system
   - Project filtering/search

4. **Performance**
   - Image optimization
   - Code splitting
   - Lazy loading
   - Database indexing

5. **Monitoring**
   - Error tracking (Sentry)
   - Analytics (Google Analytics)
   - Performance monitoring

---

## 🎓 Learning Outcomes

After completing this project, you'll understand:
- ✅ Full-stack development workflow
- ✅ Frontend-backend integration
- ✅ RESTful API design
- ✅ Database modeling
- ✅ Deployment and DevOps
- ✅ CORS and async operations
- ✅ Environment configuration
- ✅ Git version control

---

## 🤝 Need Help?

1. Check the relevant documentation file:
   - `README.md` - Project overview
   - `DEPLOYMENT.md` - Deployment guide
   - `API.md` - API reference

2. Check server logs:
   ```bash
   npm run dev  # See backend logs
   # Browser console for frontend logs
   ```

3. Common fixes:
   - Clear cache: Delete `.next`, `build/`, `node_modules/`
   - Update dependencies: `npm update`
   - Check environment variables

---

**Happy building! 🚀**

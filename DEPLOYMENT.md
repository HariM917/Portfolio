# Portfolio Deployment Guide

## Quick Start - Local Development

### 1. Backend Setup (First Terminal)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### 2. Frontend Setup (Second Terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Visit `http://localhost:3000`

---

## Deployment Guide

### Option A: Deploy on Vercel (Recommended for Full-Stack)

**Advantages**: Easy deployment, automatic HTTPS, serverless functions, great performance

**Steps:**

1. **Prepare repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub/GitLab repository

3. **Configure environment variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `MONGODB_URI` (your MongoDB connection string)
   - Add: `FRONTEND_URL` (your Vercel deployment URL)

4. **Deploy**
   - Click Deploy
   - Wait for build to complete

### Option B: Deploy Frontend on Netlify, Backend on Heroku

**Frontend on Netlify:**
1. Build your React app: `npm run build` (creates `build/` folder)
2. Go to https://netlify.com → New site from Git
3. Select your repository and deploy
4. Update `REACT_APP_API_URL` to your backend URL

**Backend on Heroku:**
1. Create Heroku account and install CLI
2. In backend directory:
   ```bash
   cd backend
   heroku create your-app-name
   ```
3. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set FRONTEND_URL=your_netlify_url
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

---

## MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com
2. Create free account
3. Create new project
4. Build a cluster (choose free tier)
5. Create database user with password
6. Get connection string from "Connect" button
7. Replace `<username>`, `<password>`, and database name
8. Add to `.env` as `MONGODB_URI`

---

## Database Configuration

### Creating Collections

The backend automatically creates collections when needed.

### Sample Data Insert

```bash
# Using MongoDB Atlas client or Compass
db.projects.insertOne({
  title: "E-Commerce Platform",
  description: "Full-featured shopping cart",
  technologies: ["React", "Node.js", "MongoDB"],
  link: "https://yoursite.com",
  githubLink: "https://github.com/user/ecommerce",
  featured: true,
  createdAt: new Date()
})
```

---

## Domain & HTTPS

### Vercel
- HTTPS is automatic
- Add custom domain in Settings → Domains

### Netlify
- HTTPS is automatic
- Add custom domain in Domain settings

### Heroku Backend
- HTTPS included
- Custom domain setup in Settings → Domains

---

## Environment Variables Checklist

**Backend (.env)**
- [ ] `MONGODB_URI` = MongoDB connection string
- [ ] `PORT` = 5000 (or your choice)
- [ ] `NODE_ENV` = development/production
- [ ] `FRONTEND_URL` = your frontend URL

**Frontend (.env)**
- [ ] `REACT_APP_API_URL` = your backend URL

---

## Monitoring & Maintenance

### Vercel
- Dashboard shows deployment status and logs
- Analytics available for performance tracking

### Netlify
- Build logs and deployment history visible
- Real-time monitoring available

### Heroku
- View logs: `heroku logs --tail`
- View metrics in dashboard

### MongoDB
- Monitor database in Atlas dashboard
- Check query performance in Performance Advisor

---

## Troubleshooting

### CORS Errors
Check that `FRONTEND_URL` environment variable matches your actual frontend URL

### Database connection fails
1. Check MongoDB URI is correct
2. Verify IP whitelist in MongoDB Atlas
3. Ensure database user has correct permissions

### Frontend axios requests failing
1. Verify backend is running
2. Check `REACT_APP_API_URL` is correct
3. Ensure CORS is properly configured

### Build failures on Vercel
1. Check all environment variables are set
2. Verify dependencies in package.json
3. Check for TypeScript errors

---

## Performance Tips

1. **Images**: Use optimized formats (WebP), lazy loading
2. **Code splitting**: React automatically code-splits
3. **Database indexing**: Add indexes to frequently queried fields
4. **Caching**: Set appropriate cache headers
5. **Compression**: Enable gzip compression (automatic on Vercel)

---

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use environment variables for secrets
3. ✅ Enable MongoDB IP whitelist
4. ✅ Use strong database passwords
5. ✅ Keep dependencies updated: `npm audit`
6. ✅ Use HTTPS only
7. ✅ Validate all inputs
8. ✅ Review error messages before production

---

## Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.mongodb.com/atlas/)
- [Express.js Guide](https://expressjs.com/)
- [React Docs](https://react.dev/)

---

## Support

For issues:
1. Check this guide first
2. Review server logs: `npm run dev` output
3. Check browser console for frontend errors
4. Review MongoDB Atlas logs
5. Open GitHub issue with error details

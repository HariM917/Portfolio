# Personal Portfolio Website

A full-stack portfolio application to showcase your projects and skills.

## 🚀 Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Vercel

## 📋 Features

- Responsive design that works on all devices
- Project showcase with filtering and sorting
- Skills section with categories
- RESTful API for project management
- MongoDB database for persistent storage
- CI/CD ready with Vercel deployment

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free)
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 📚 Project Structure

```
portfolio/
├── frontend/                 # React application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── App.js           # Main component
│   │   ├── App.css          # Styling
│   │   └── index.js         # Entry point
│   └── package.json
├── backend/                  # Express.js API
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── models/
│   │   └── Project.js       # Project schema
│   ├── routes/
│   │   └── projects.js      # API endpoints
│   ├── server.js            # Express server
│   └── package.json
└── vercel.json              # Vercel deployment config
```

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 💾 MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user with read/write permissions
4. Get your connection string and add it to `.env`

## 🚢 Deployment to Vercel

### Via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

### Via GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `FRONTEND_URL`: Your deployed frontend URL
6. Deploy!

## 📝 Sample Project Data

To add sample projects, use this cURL command:

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-Commerce Platform",
    "description": "A full-featured e-commerce platform built with React and Node.js",
    "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
    "link": "https://example.com",
    "githubLink": "https://github.com/username/ecommerce",
    "featured": true
  }'
```

## 🔒 Security Considerations

- Never commit `.env` file to version control
- Use environment variables for sensitive data
- Validate input on both frontend and backend
- Keep dependencies updated
- Use HTTPS for all communications

## 📈 Next Steps to Enhance

- Add authentication (JWT)
- Implement admin panel for project management
- Add email contact form
- Integrate blog/articles section
- Add social media links
- Implement search and filtering
- Add dark mode toggle
- Performance optimization (image lazy loading, etc.)

## 🤝 Contributing

Feel free to fork this project and customize it for your portfolio!

## 📄 License

This project is open source and available under the MIT License.

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Happy coding! 🎉**

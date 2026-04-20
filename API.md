# Portfolio API Documentation

Base URL: `http://localhost:5000/api` (development) or your deployed URL

## Authentication
Currently, no authentication is required. You can add JWT authentication for production.

---

## Endpoints

### Health Check
Check if the API is running.

```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

### Get All Projects
Retrieve all projects, sorted by newest first.

```
GET /projects
```

**Query Parameters:**
- None

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-Commerce Platform",
    "description": "A full-featured e-commerce application",
    "image": "https://example.com/image.jpg",
    "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
    "link": "https://myecommerce.com",
    "githubLink": "https://github.com/username/ecommerce",
    "featured": true,
    "createdAt": "2024-04-20T10:30:00.000Z",
    "updatedAt": "2024-04-20T10:30:00.000Z"
  }
]
```

---

### Get Featured Projects
Retrieve only featured projects.

```
GET /projects/featured
```

**Response (200 OK):**
Same as above, but only featured projects

---

### Get Single Project
Retrieve a specific project by ID.

```
GET /projects/:id
```

**URL Parameters:**
- `id` - Project MongoDB ID

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "E-Commerce Platform",
  "description": "A full-featured e-commerce application",
  "technologies": ["React", "Node.js", "MongoDB"],
  "link": "https://myecommerce.com",
  "githubLink": "https://github.com/username/ecommerce",
  "featured": true,
  "createdAt": "2024-04-20T10:30:00.000Z",
  "updatedAt": "2024-04-20T10:30:00.000Z"
}
```

**Error (404 Not Found):**
```json
{
  "message": "Project not found"
}
```

---

### Create Project
Create a new project.

```
POST /projects
```

**Request Body:**
```json
{
  "title": "My New Project",
  "description": "Project description goes here",
  "image": "https://example.com/image.jpg",
  "technologies": ["React", "Node.js"],
  "link": "https://myproject.com",
  "githubLink": "https://github.com/username/myproject",
  "featured": true
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "My New Project",
  "description": "Project description goes here",
  "image": "https://example.com/image.jpg",
  "technologies": ["React", "Node.js"],
  "link": "https://myproject.com",
  "githubLink": "https://github.com/username/myproject",
  "featured": true,
  "createdAt": "2024-04-20T10:30:00.000Z",
  "updatedAt": "2024-04-20T10:30:00.000Z"
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Validation error message"
}
```

---

### Update Project
Update an existing project.

```
PATCH /projects/:id
```

**URL Parameters:**
- `id` - Project MongoDB ID

**Request Body (all fields optional):**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "image": "https://example.com/new-image.jpg",
  "technologies": ["React", "Vue.js"],
  "link": "https://updatedproject.com",
  "featured": false
}
```

**Response (200 OK):**
Updated project object (same format as Get Single Project)

**Error (404 Not Found):**
```json
{
  "message": "Project not found"
}
```

---

### Delete Project
Delete a project.

```
DELETE /projects/:id
```

**URL Parameters:**
- `id` - Project MongoDB ID

**Response (200 OK):**
```json
{
  "message": "Project deleted"
}
```

**Error (404 Not Found):**
```json
{
  "message": "Project not found"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "message": "Error description"
}
```

### Common Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Example Requests

### Using cURL

**Create a project:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Chat Application",
    "description": "Real-time chat app with Socket.io",
    "technologies": ["React", "Node.js", "Socket.io", "MongoDB"],
    "link": "https://mychat.com",
    "featured": true
  }'
```

**Get all projects:**
```bash
curl http://localhost:5000/api/projects
```

**Get single project:**
```bash
curl http://localhost:5000/api/projects/507f1f77bcf86cd799439011
```

**Update project:**
```bash
curl -X PATCH http://localhost:5000/api/projects/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "featured": false,
    "title": "Updated Chat Application"
  }'
```

**Delete project:**
```bash
curl -X DELETE http://localhost:5000/api/projects/507f1f77bcf86cd799439011
```

### Using JavaScript/Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all projects
const projects = await axios.get(`${API_URL}/projects`);

// Create project
const newProject = await axios.post(`${API_URL}/projects`, {
  title: "My Project",
  description: "Description",
  technologies: ["React", "Node.js"],
  featured: true
});

// Update project
const updated = await axios.patch(`${API_URL}/projects/id123`, {
  featured: false
});

// Delete project
await axios.delete(`${API_URL}/projects/id123`);
```

---

## Database Schema

### Project
```
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  image: String,
  technologies: [String],
  link: String,
  githubLink: String,
  featured: Boolean (default: false),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## Rate Limiting

Currently no rate limiting. For production, consider implementing:
- Request throttling
- IP-based rate limiting
- User-based rate limiting

---

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (development)
- Your deployed frontend URL (production)

To modify, update the CORS settings in `backend/server.js`

---

## Future Enhancements

- [ ] Authentication (JWT)
- [ ] User roles (admin, viewer)
- [ ] Project comments/reviews
- [ ] Image upload
- [ ] Search and filtering
- [ ] Pagination
- [ ] Rate limiting
- [ ] API versioning

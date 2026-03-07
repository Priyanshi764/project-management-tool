# 🚀 Professional Project Management Tool

A full-stack, production-ready project management application with advanced features like priority system, due dates, activity tracking, and real-time collaboration. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

### 🎯 Core Features
- **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- **Google OAuth** - One-click sign-in with Google account
- **Project Management** - Create, view, and manage multiple projects
- **Kanban Board** - Visual task management with drag-and-drop functionality
- **Task Management** - Create, update, delete, and organize tasks

### 🔥 Advanced Features
- **Priority System** - 🔴 High, 🟡 Medium, 🟢 Low priority levels with color-coded borders
- **Due Dates** - Set deadlines with overdue highlighting and alerts
- **Task Assignment** - Assign tasks to team members with avatar display
- **Activity Feed** - Real-time activity log showing all project actions
- **Dashboard Analytics** - Comprehensive stats with completion rates and task distribution
- **Comments System** - Collaborate with inline task comments
- **Overdue Alerts** - Visual indicators for overdue tasks

### 🎨 Professional UI/UX
- **Modern Tailwind CSS** - Beautiful gradient designs and smooth animations
- **Responsive Design** - Works perfectly on all devices
- **Glass Morphism** - Modern glassmorphism effects
- **Card Animations** - Smooth hover effects and transitions
- **Loading States** - Professional loading indicators
- **Modal Dialogs** - Clean, animated modals for forms
- **Activity Panel** - Slide-out panel for activity tracking

## 📊 Dashboard Features

- **Total Projects** - Track all your projects
- **Total Tasks** - View all tasks across projects
- **Completion Rate** - Visual percentage of completed tasks
- **Overdue Tasks** - Quick view of overdue items
- **Task Distribution** - Progress bars showing task status breakdown
- **High Priority Tasks** - Count of urgent tasks

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios
- Tailwind CSS v4
- Vite

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs
- Passport.js with Google OAuth 2.0

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend:
```bash
cd backend
npm install
```

2. Configure `.env` (see `.env.example`):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

3. **Set up Google OAuth** (Required for Google Sign-In):
   - Follow the detailed guide in `GOOGLE_OAUTH_SETUP.md`
   - Get credentials from [Google Cloud Console](https://console.cloud.google.com/)

4. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend:
```bash
cd frontend
npm install
```

2. Configure Google OAuth:
   - Open `frontend/src/main.jsx`
   - Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Google Client ID

3. Start development server:
```bash
npm run dev
```

4. Open `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks/:projectId` - Get all tasks for project
- `GET /api/tasks/stats/dashboard` - Get dashboard statistics
- `POST /api/tasks` - Create task (with priority, dueDate, assignedTo)
- `PUT /api/tasks/:id` - Update task (status, priority, dueDate)
- `PUT /api/tasks/assign/:id` - Assign task to user
- `DELETE /api/tasks/:id` - Delete task

### Comments
- `GET /api/comments/:taskId` - Get comments for task
- `POST /api/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

### Activity
- `GET /api/activities/:projectId` - Get activity log for project

## 🎯 Key Features Explained

### Priority System
Tasks are color-coded by priority:
- 🔴 **High Priority** - Red border, urgent tasks
- 🟡 **Medium Priority** - Yellow border, normal tasks
- 🟢 **Low Priority** - Green border, low urgency

### Due Dates & Overdue Alerts
- Set due dates for any task
- Overdue tasks show red ring animation
- Dashboard shows total overdue count
- Visual "⚠️ OVERDUE" badge on cards

### Activity Tracking
Real-time activity feed shows:
- Task creation
- Status changes
- Comments added
- Task assignments
- Task deletions

### Dashboard Analytics
- Total projects count
- Total tasks across all projects
- Completion percentage
- Overdue tasks count
- High priority tasks count
- Visual progress bars for task distribution

### Task Assignment
- Assign tasks to project members
- Avatar circles show assigned user
- Dropdown selection in task creation
- Activity log tracks assignments

## 🎨 UI Highlights

- **Gradient Backgrounds** - Beautiful color gradients throughout
- **Smooth Animations** - Fade-in, slide-up, scale-in effects
- **Card Hover Effects** - Lift and shadow on hover
- **Glass Morphism** - Modern frosted glass effects
- **Responsive Grid** - Adapts to all screen sizes
- **Loading Spinners** - Professional loading states
- **Toast Notifications** - Error and success messages

## 📱 Responsive Design

- Mobile-first approach
- Tablet-optimized layouts
- Desktop-enhanced experience
- Touch-friendly interactions

## 🔒 Security Features

- JWT token authentication
- Google OAuth 2.0 integration
- Password hashing with bcrypt
- Protected API routes
- Secure token storage
- Input validation
- CORS configuration

## 🚀 Production Ready

- Optimized build process
- Code splitting
- Lazy loading
- Error boundaries
- Environment variables
- Production-ready backend

## 📈 Future Enhancements

- Real-time updates with Socket.io
- File attachments
- Email notifications
- Team invitations
- Role-based permissions
- Calendar view
- Gantt charts
- Time tracking
- Export to PDF/Excel
- GitHub/GitLab integration
- Slack notifications

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ using modern web technologies

---

**Note:** This is a production-ready application suitable for portfolio projects, interviews, and real-world use cases.

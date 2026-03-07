# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start Backend Server

```bash
cd backend
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 2: Start Frontend Server

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Step 3: Use the Application

1. Open `http://localhost:5173` in your browser
2. Register a new account
3. Login with your credentials
4. Create your first project
5. Start managing tasks on the Kanban board!

## 🎨 Features Overview

### Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes

### Dashboard
- View all your projects
- Create new projects with modal
- Beautiful card-based layout
- Logout functionality

### Kanban Board
- Three columns: To Do, In Progress, Done
- Drag tasks between columns
- Add/delete tasks
- Task comments system
- Real-time status updates

### Professional UI
- Modern Tailwind CSS styling
- Responsive design
- Smooth transitions and hover effects
- Clean and intuitive interface

## 🔧 Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct in `.env`
- Ensure MongoDB is running
- Check if port 5000 is available

### Frontend won't start
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 5173 is available
- Ensure backend is running first

### Can't login
- Verify backend is running on port 5000
- Check browser console for errors
- Ensure MongoDB connection is active

## 📝 Default Configuration

- Backend Port: 5000
- Frontend Port: 5173
- JWT Expiry: 1 day
- Database: MongoDB

## 🎯 Next Steps

- Add team members to projects
- Assign tasks to specific users
- Add due dates to tasks
- Implement real-time updates with Socket.io
- Add file attachments to tasks

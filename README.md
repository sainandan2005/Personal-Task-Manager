# Personal Task Manager

A minimalist task management application built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring a sleek dark mode UI.

![Dark Mode Task Manager](https://via.placeholder.com/800x400/121212/ffffff?text=Geometric+Dark+Mode+Task+Manager)

## Features

- **Minimalist Task Management**: Focus on what matters - just title, priority, and due date
- **Geometric UI Elements**: Modern design with polygon shapes, clip-paths, and 3D effects
- **Sleek Dark Mode UI**: Easy on the eyes with a modern design and subtle animations
- **Priority-based Organization**: Quickly identify important tasks with color coding
- **Responsive Design**: Works flawlessly on desktop and mobile devices
- **Interactive Elements**: Ripple effects and smooth transitions for better user experience

## Tech Stack

- **Frontend**: React.js with React Bootstrap, dark-themed UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Data Validation**: Mongoose

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB installed locally or a MongoDB Atlas account

### Installation and Setup

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/personal-task-manager.git
cd personal-task-manager
```

#### 2. Backend setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with your MongoDB URI and other settings
# Example .env file:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/taskmanager
# NODE_ENV=development

# Start the backend server
npm run dev
```

The backend API will be available at http://localhost:5000

#### 3. Frontend setup

```bash
# Navigate to the frontend directory from the project root
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend application will be available at http://localhost:3000

## API Endpoints

- GET `/api/tasks` - Get all tasks
- GET `/api/tasks/:id` - Get a single task by ID
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Project Structure

```
backend/
├── config/         # Database and configuration files
├── controllers/    # Request handlers
├── models/         # Mongoose models
├── routes/         # API routes
└── server.js       # Express app and main entry point

frontend/
├── public/         # Static files
└── src/
    ├── components/ # React components
    ├── services/   # API services
    └── App.js      # Main React component
```

## Future Enhancements

- User authentication
- Task categories/labels
- Task comments
- Email notifications for due dates
- Drag and drop interface
- Task sharing

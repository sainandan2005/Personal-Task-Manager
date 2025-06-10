# Personal Task Manager - Vite Migration

A sleek dark mode task management application built with the MERN stack, migrated from Create React App to Vite for better performance and development experience.

## Features

- 🚀 **Fast Development** - Powered by Vite with Hot Module Replacement (HMR)
- 🌙 **Dark Theme** - Minimalist dark UI with geometric design elements
- ✅ **Task Management** - Create, edit, delete, and filter tasks
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Bootstrap 5 with custom geometric styling
- ⚡ **Optimized Build** - Fast production builds with Vite

## Tech Stack

- **Frontend**: React 19, React Router, React Bootstrap, Vite
- **Backend**: Node.js, Express.js, MongoDB
- **Styling**: Bootstrap 5, Custom CSS with CSS Variables
- **Build Tool**: Vite (migrated from Create React App)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Personal Task Manager"
   ```

2. **Install frontend dependencies**
   ```bash
   cd vite-migration
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   Backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd vite-migration
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

### Available Scripts

In the frontend directory (`vite-migration`):

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

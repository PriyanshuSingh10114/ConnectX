# ConnectX - Real-Time Chat Application

A production-ready real-time chat application built with React, Node.js, Express, Socket.io, and MongoDB.

## Features
- **Real-Time Messaging**: Instant message broadcasting using Socket.io.
- **Chat History**: Persistent storage of all messages in MongoDB.
- **Typing Indicators**: See when others are typing in real-time.
- **Online Presence**: Track and display the number of connected users.
- **Responsive UI**: A modern, responsive design with Dark Mode support using Tailwind CSS.
- **Clean Architecture**: Modular and maintainable backend structure.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Socket.io-client, React Query, DayJS, Lucide React.
- **Backend**: Node.js, Express.js, Socket.io, MongoDB (Mongoose).
- **Security & Optimization**: Helmet, CORS, Compression, express-validator.

## Project Structure
```
ConnectX/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection
│   │   ├── controllers/     # Route logic
│   │   ├── middlewares/     # Error handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routes
│   │   ├── socket/          # Socket.io handlers
│   │   └── validators/      # Input validation
│   ├── app.js               # Express app setup
│   └── server.js            # Server entry point
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios instance
│   │   ├── components/      # Reusable UI elements
│   │   ├── context/         # Auth state
│   │   ├── hooks/           # Custom hooks (useChat, useSocket)
│   │   ├── screens/         # Page components
│   │   └── services/        # Socket service singleton
│   ├── tailwind.config.js   # Tailwind setup
│   └── vite.config.js       # Vite configuration
├── postman_collection.json  # API Testing suite
└── render.yaml              # Deployment configuration
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URL)

### 1. MongoDB Setup
Make sure MongoDB is running locally on `mongodb://localhost:27017` or have a MongoDB Atlas connection string ready.

### 2. Backend Setup
```bash
cd backend
npm install
# Rename .env.example to .env and configure your variables
cp .env.example .env
# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Configure environment variables if necessary (in frontend/.env)
# Start the Vite development server
npm run dev
```

## Environment Variables
**Backend (`backend/.env`)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chat_app
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## API Documentation
See the included `postman_collection.json` to test the API endpoints.

### REST Endpoints
- `GET /api/health` - Check API and DB status.
- `GET /api/messages?page=1&limit=50` - Get paginated chat history.
- `POST /api/messages` - Send a new message (also broadcasted via Socket.io).

### Socket Events
- **Client Emits**: `join`, `message:send`, `typing:start`, `typing:stop`
- **Server Emits**: `message:new`, `user:online`, `user:offline`, `typing:start`, `typing:stop`, `error`

## Deployment Instructions (Render)
1. Push this repository to GitHub.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your repository. Render will automatically detect the `render.yaml` file.
4. Set the necessary environment variables (`MONGODB_URI`, `CLIENT_URL`) in the Render dashboard.
5. For the frontend, deploy it as a **Static Site** on Render or Vercel using `npm run build` as the build command and `dist` as the publish directory.

## Future Improvements
- Token-based Authentication (JWT).
- Private one-on-one messaging.
- File and image uploads.
- Message status (Delivered, Read).

# TaskFlow

TaskFlow is a full-stack task management application built using the MERN stack. It allows users to securely manage their tasks with authentication, task filtering, search, dashboard statistics, and profile management.

## Features

- User Signup and Login
- JWT-based Authentication
- Protected Routes
- Create Tasks
- Update Tasks
- Delete Tasks
- Search Tasks
- Filter Tasks by Status
- Filter Tasks by Priority
- Dashboard Task Statistics
- User Profile
- Change Password
- Logout
- User-specific Tasks
- Responsive UI

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- Tailwind CSS
- React Icons
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
TaskFlow/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── server.js
│
├── .gitignore
└── README.md
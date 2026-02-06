# Task Manager Application

A robust, responsive Task Management Web Application built with the MERN stack (MongoDB, Express, React/Vanilla JS, Node.js). This application allows users to create, view, update, and delete tasks with a modern and premium user interface.

## Features

-   **User Authentication**: Secure Sign-up and Login functionality using JWT.
-   **Full CRUD Operations**:
    -   **Create**: Add tasks with titles and descriptions.
    -   **Read**: View a list of user-specific tasks.
    -   **Update**: Edit task details and toggle completion status.
    -   **Delete**: Remove tasks permanently.
-   **Premium UI**:
    -   Modern aesthetics with **Inter** font and soft shadows.
    -   Fully responsive design for mobile and desktop.
    -   Clear text-based actions ("Done", "Edit", "Delete").
    -   Status badges and interactive hover effects.

## Tech Stack

-   **Frontend**: HTML5, CSS3 (Custom Properties, Flexbox), JavaScript (ES6+).
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Mongoose ODM).
-   **Authentication**: JSON Web Tokens (JWT), BcryptJS.

## Prerequisites

Ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [MongoDB](https://www.mongodb.com/) (Local installation or Atlas URI)
-   Python 3 (optional, for running the simple frontend server)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/anaghahallur/Task-Manager.git
cd Task-Manager
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```
The server will start on `http://localhost:5001`.

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

You can serve the frontend using Python's built-in HTTP server (or any other static file server):

```bash
python3 -m http.server 5500
```

### 4. Running the Application

1.  Ensure both the Backend (port 5001) and Frontend (port 5500) servers are running.
2.  Open your browser and navigate to:
    `http://localhost:5500/frontend/login.html` (if running from root)
    OR
    `http://localhost:5500/login.html` (if server started inside frontend folder)

## API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/signin` | Login user | No |
| GET | `/api/tasks` | Get all tasks for user | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update a task (title/desc/status) | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

## Project Structure

```
Task-Manager/
├── backend/
│   ├── middleware/   # Auth middleware
│   ├── models/       # Mongoose models (User, Task)
│   ├── routes/       # API routes
│   └── server.js     # Entry point
├── frontend/
│   ├── login.html    # Login page
│   ├── register.html # Registration page
│   ├── dashboard.html# Main task dashboard
│   ├── styles.css    # Global styles
│   ├── auth.js       # Auth logic
│   └── tasks.js      # Task management logic
└── README.md
```

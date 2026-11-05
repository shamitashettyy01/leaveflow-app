# LeaveFlow – Leave Management System

## 1. Project Overview

LeaveFlow is a web-based Leave Management System developed to simplify and automate employee leave management.

The system allows employees to apply for leave, track application status, and view their available leave balance. Administrators can view employee leave requests and approve or reject applications.

## 2. Features

### Employee Module
- Employee registration and login
- Secure authentication
- Apply for leave
- Select leave type and dates
- Provide leave reason
- View leave application history
- Track pending, approved and rejected requests
- View available leave balance

### Admin Module
- Admin login
- View all employee leave applications
- View total, pending, approved and rejected applications
- Approve leave requests
- Reject leave requests
- Automatic leave balance deduction after approval
- Admin dashboard

## 3. Technology Stack

Frontend:
- React.js
- HTML
- CSS
- JavaScript
- Axios

Backend:
- Node.js
- Express.js

Database:
- MongoDB
- Mongoose

Authentication:
- JSON Web Token (JWT)
- bcryptjs

Development Tools:
- Visual Studio Code
- Postman
- MongoDB Compass
- Git and GitHub

## 4. Project Architecture

The project follows a client-server architecture.

1. React frontend provides the user interface.
2. Axios sends HTTP requests to the backend.
3. Node.js and Express.js process API requests.
4. MongoDB stores employee and leave application details.
5. JWT is used for authenticated access.
6. The admin manages employee leave applications.

## 5. Project Folder Structure

leave-management-system/
│
├── client/
│   └── vite-project/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── Login.jsx
│       │   ├── Dashboard.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── ApplyLeave.jsx
│       │   └── LeaveHistory.jsx
│       └── package.json
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Leave.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── leaves.js
│   ├── server.js
│   ├── createAdmin.js
│   └── package.json
│
└── README.md

## 6. Installation and Setup

### Prerequisites
- Node.js and npm
- MongoDB Community Server
- Visual Studio Code

### Backend Setup

Open a terminal:

cd server

Install dependencies:

npm install

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/leave_management
JWT_SECRET=your_secure_secret

Start the backend:

npm run dev

Backend URL:

http://localhost:5000

### Frontend Setup

Open another terminal:

cd client/vite-project

Install dependencies:

npm install

Start the frontend:

npm run dev

Frontend URL:

http://localhost:5173

## 7. Environment Variables

The backend requires the following environment variables:

- PORT: Backend server port.
- MONGO_URI: MongoDB connection string.
- JWT_SECRET: Secret key used for JWT authentication.

Do not upload the .env file to GitHub.

## 8. API Endpoints

### Authentication

POST /api/auth/register
- Registers an employee.

POST /api/auth/login
- Authenticates an employee or administrator.

GET /api/auth/me
- Retrieves the logged-in user's details.

### Leave Management

POST /api/leaves/apply
- Submits a leave application.

GET /api/leaves/my-leaves
- Retrieves the logged-in employee's leave history.

GET /api/leaves/all
- Retrieves all leave applications for administrators.

PATCH /api/leaves/:id/status
- Approves or rejects a leave application.

## 9. Leave Application Workflow

1. Employee logs into the system.
2. Employee submits a leave application.
3. Application is stored in MongoDB with Pending status.
4. Administrator views the application.
5. Administrator approves or rejects the application.
6. If approved, the employee's leave balance is deducted.
7. Employee can view the updated status and leave balance.

## 10. Security

- Passwords are hashed using bcryptjs.
- JWT authentication protects restricted API routes.
- Admin-only operations use role-based authorization.
- Environment variables store sensitive configuration.

## 11. Deployment

Deployment details will be updated after hosting the frontend and backend.

Frontend Deployment URL: To be added.

Backend Deployment URL: To be added.

GitHub Repository URL: To be added.

## 12. Future Enhancements

- Email notifications for leave approval and rejection.
- Employee profile management.
- Leave cancellation.
- Different leave policies and yearly allocations.
- Improved reports and analytics.

## 13. Conclusion

LeaveFlow provides a simple and efficient platform for managing employee leave applications. It reduces manual work, improves transparency and helps administrators manage leave requests efficiently.
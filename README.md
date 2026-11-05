LeaveFlow – Leave Management System

Project Overview

LeaveFlow is a web-based Leave Management System developed to simplify and manage employee leave requests. It allows employees to apply for leave and track their leave history, while administrators can manage, approve, or reject leave applications.

Technologies Used

- Frontend: React.js, HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JWT and bcrypt
- API Testing: Postman
- Deployment: Render (Backend)

Features

Employee

- Employee registration and login
- Apply for leave
- Select leave type and dates
- View leave application history
- Track leave balance
- Check leave application status

Administrator

- Admin login
- View all employee leave requests
- Approve or reject leave applications
- View leave management statistics
- Manage leave requests

Project Structure

LeaveFlow/
├── client/
│   └── vite-project/
│       └── src/
├── server/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── createAdmin.js
│   └── package.json
├── README.md
└── BRD.md

Installation and Setup

1. Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL
cd LeaveFlow

2. Set Up Backend

cd server
npm install

Create a ".env" file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend:

npm run dev

3. Set Up Frontend

Open another terminal:

cd client/vite-project
npm install
npm run dev

Open the local frontend URL displayed in the terminal.

API Endpoints

Method| Endpoint| Description
POST| /api/auth/register| Employee registration
POST| /api/auth/login| User login
GET| /api/auth/me| Get logged-in user
POST| /api/leaves/apply| Apply for leave
GET| /api/leaves/my-leaves| View personal leave history
GET| /api/leaves/all| View all leave requests
PATCH| /api/leaves/:id/status| Approve or reject leave

Deployment

- Backend: Deployed using Render.
- Database: MongoDB Atlas.
- Frontend: Local development setup; frontend deployment is pending.

Project Purpose

The main objective of LeaveFlow is to reduce manual leave management work and provide a simple, organized system for employees and administrators.

---

Project Name: LeaveFlow – Leave Management System
Developed as: Internship Project

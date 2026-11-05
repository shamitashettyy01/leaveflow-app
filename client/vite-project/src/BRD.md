# BUSINESS REQUIREMENTS DOCUMENT (BRD)
# Project: LeaveFlow – Leave Management System

## 1. Introduction

LeaveFlow is a web-based application designed to manage employee leave requests efficiently. It replaces manual leave management processes with a centralized digital system.

The application provides separate functionalities for employees and administrators.

## 2. Project Objectives

- Automate employee leave application procedures.
- Reduce manual paperwork.
- Simplify leave approval and rejection.
- Maintain employee leave records.
- Track available and utilized leave balances.
- Improve transparency between employees and administrators.

## 3. Scope of the Project

The system includes two main modules:

### Employee Module
- Employee registration and login.
- Apply for different types of leave.
- Enter leave dates and reasons.
- View leave application history.
- Check application status.
- View available leave balance.

### Administrator Module
- Secure admin login.
- View all employee leave applications.
- View application statistics.
- Approve or reject leave requests.
- Manage leave application status.
- Ensure leave balance is updated after approval.

## 4. User Requirements

### Employee
Employees should be able to:
- Create an account and log in.
- Submit leave applications.
- View previous leave requests.
- Track pending, approved and rejected applications.
- Check remaining leave balance.

### Administrator
Administrators should be able to:
- Log in securely.
- View all employee applications.
- View employee details.
- Approve or reject pending applications.
- Monitor application statistics.

## 5. Functional Requirements

FR-01: The system shall allow employees to register.

FR-02: The system shall authenticate employees and administrators.

FR-03: Employees shall be able to apply for leave.

FR-04: The system shall store leave applications in MongoDB.

FR-05: Employees shall be able to view their leave history.

FR-06: Administrators shall be able to view all leave applications.

FR-07: Administrators shall be able to approve or reject leave requests.

FR-08: The system shall deduct approved leave days from the employee's leave balance.

FR-09: The system shall display pending, approved and rejected application counts.

FR-10: The system shall allow users to log out.

## 6. Non-Functional Requirements

- Usability: The interface should be simple and user-friendly.
- Security: Passwords should be securely hashed.
- Authentication: JWT should protect restricted operations.
- Performance: The application should respond efficiently.
- Reliability: Leave records should be stored accurately.
- Maintainability: The application should have a modular structure.

## 7. Technology Requirements

Frontend:
- React.js
- HTML
- CSS
- JavaScript

Backend:
- Node.js
- Express.js

Database:
- MongoDB
- Mongoose

Additional Technologies:
- Axios
- JWT
- bcryptjs
- Postman
- Visual Studio Code

## 8. System Workflow

1. Employee registers or logs in.
2. Employee opens the dashboard.
3. Employee submits a leave application.
4. The application is saved with Pending status.
5. Administrator logs in.
6. Administrator views the submitted application.
7. Administrator approves or rejects the request.
8. If approved, the employee's leave balance is deducted.
9. Employee views the updated application status and balance.

## 9. Database Requirements

### User Collection
Stores:
- Employee name
- Email address
- Hashed password
- User role
- Leave balance

### Leave Collection
Stores:
- Employee reference
- Leave type
- Start date
- End date
- Leave reason
- Application status
- Creation and update timestamps

## 10. Security Requirements

- Passwords must not be stored in plain text.
- Authentication must be implemented using JWT.
- Only administrators can approve or reject leave applications.
- Employees should access only their own leave records.
- Sensitive configuration must be stored in environment variables.

## 11. Assumptions and Constraints

- Users must have valid login credentials.
- An employee must be registered before applying for leave.
- Only administrators can approve or reject requests.
- The system requires an active database connection.
- The initial leave allocation is 24 days.

## 12. Deployment Requirements

The application will be deployed using cloud hosting services.

Planned deployment:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Source Code: GitHub

Deployment details:

Frontend URL: To be updated.

Backend URL: To be updated.

GitHub Repository: To be updated.

## 13. Future Enhancements

- Email notifications.
- Employee profile management.
- Leave cancellation.
- Advanced leave reports.
- Different leave policies.
- Calendar-based leave tracking.

## 14. Conclusion

LeaveFlow provides an efficient and user-friendly solution for employee leave management. It simplifies leave applications, improves approval procedures and maintains accurate leave records through a centralized database.
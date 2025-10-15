# Primetrade.ai Backend Developer Intern Assignment

## Overview
This repository contains the completed **Backend Developer Intern Assignment** for Primetrade.ai.  
The project includes a **Node.js/Express backend** with user authentication, profile management, and API endpoints ready for integration with a frontend application.

---

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT (JSON Web Token)  
- **Tools:** Postman (API testing), Nodemon, Git & GitHub  

---

## Features Implemented

### User Authentication
- **Register**: `/api/users/register`  
- **Login**: `/api/users/login`  
- **Profile**: `/api/users/profile` (Protected route, JWT authentication)

### Backend Functionality
- Password hashing using `bcryptjs`
- Error handling with custom middleware
- API endpoints fully tested with Postman
- Modular folder structure for scalability

---

## Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/Primetrade.ai-Backend-Developer-Intern-Assignment.git
cd Primetrade.ai-Backend-Developer-Intern-Assignment/backend


Install dependencies

npm install


Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


Run the server

npm run dev

API Endpoints
Method	Endpoint	Description	Access
POST	/api/users/register	Register a new user	Public
POST	/api/users/login	Authenticate user and get token	Public
GET	/api/users/profile	Get user profile information	Private (JWT token required)
Testing APIs

Use Postman to test all endpoints.

Include the JWT token in the header for protected routes:

Authorization: Bearer <your_jwt_token>

Folder Structure
backend/
├── controllers/
│   ├── userController.js
├── middleware/
│   ├── authMiddleware.js
├── models/
│   ├── userModel.js
├── routes/
│   ├── userRoutes.js
├── src/
│   └── app.js
├── package.json
└── README.md

Screenshots

Register API Test


Login API Test


Profile API Test


Author

Bonaboina Gowtham

GitHub: [https://github.com/YOUR_USERNAME](https://github.com/dashboard)

LinkedIn: https://www.linkedin.com/in/bonaboinachithragowthamyadav


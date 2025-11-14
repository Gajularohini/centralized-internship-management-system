# 🔌 API Documentation

Base URL: `http://localhost:5000/api`

## 📝 Table of Contents
- [Authentication](#authentication)
- [Students](#students)
- [Teachers](#teachers)
- [Companies](#companies)
- [Internships](#internships)
- [Applications](#applications)
- [Tasks](#tasks)
- [Feedback](#feedback)
- [Notifications](#notifications)
- [Messages](#messages)

---

## 🔐 Authentication

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "student",
  
  // For Student
  "university": "MIT",
  "department": "Computer Science",
  "semester": 6,
  "skills": ["JavaScript", "React", "Node.js"],
  
  // For Teacher
  "employeeId": "T12345",
  "designation": "Professor",
  
  // For Company
  "companyName": "Tech Corp",
  "industry": "Technology",
  "website": "https://techcorp.com"
}
```

**Response:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "student@example.com",
    "name": "John Doe",
    "role": "student",
    "createdAt": "2025-11-14T10:00:00.000Z"
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:** Same as Register

### Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "student@example.com",
    "name": "John Doe",
    "role": "student",
    "university": "MIT",
    "department": "Computer Science"
  }
}
```

### Update Profile
```http
PUT /auth/update-profile
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+1234567890",
  "skills": ["JavaScript", "React", "Node.js", "MongoDB"]
}
```

### Change Password
```http
PUT /auth/change-password
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

---

## 📚 Internships

### Get All Internships
```http
GET /internships?page=1&limit=10&status=active&category=software
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): active, closed, cancelled
- `category` (optional): software, design, marketing, etc.
- `location` (optional): city name
- `search` (optional): search in title/description

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Full Stack Developer Intern",
      "company": {
        "_id": "507f1f77bcf86cd799439012",
        "companyName": "Tech Corp",
        "logo": "/uploads/logos/logo.png"
      },
      "description": "Looking for talented full stack developers...",
      "skills": ["React", "Node.js", "MongoDB"],
      "duration": "3 months",
      "stipend": {
        "amount": 15000,
        "currency": "INR",
        "type": "paid"
      },
      "location": {
        "type": "remote",
        "city": "Bangalore"
      },
      "applicationDeadline": "2025-12-31T23:59:59.000Z",
      "applicationsCount": 45,
      "createdAt": "2025-11-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 47,
    "hasMore": true
  }
}
```

### Get Single Internship
```http
GET /internships/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Full Stack Developer Intern",
    "description": "Full description...",
    "requirements": [
      "Strong knowledge of JavaScript",
      "Experience with React",
      "Understanding of REST APIs"
    ],
    "responsibilities": [
      "Develop web applications",
      "Write clean code",
      "Collaborate with team"
    ],
    "skills": ["React", "Node.js", "MongoDB"],
    "duration": "3 months",
    "stipend": {
      "amount": 15000,
      "currency": "INR",
      "type": "paid"
    },
    "startDate": "2026-01-15T00:00:00.000Z",
    "applicationDeadline": "2025-12-31T23:59:59.000Z",
    "positions": 3,
    "perks": ["Certificate", "Letter of Recommendation"],
    "company": {
      "_id": "507f1f77bcf86cd799439012",
      "companyName": "Tech Corp",
      "industry": "Technology",
      "website": "https://techcorp.com"
    }
  }
}
```

### Create Internship (Company Only)
```http
POST /internships
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "title": "Full Stack Developer Intern",
  "description": "We are looking for...",
  "requirements": ["React experience", "Node.js knowledge"],
  "responsibilities": ["Build features", "Write tests"],
  "skills": ["React", "Node.js", "MongoDB"],
  "duration": "3 months",
  "stipend": {
    "amount": 15000,
    "currency": "INR",
    "type": "paid"
  },
  "location": {
    "type": "remote",
    "city": "Bangalore",
    "country": "India"
  },
  "startDate": "2026-01-15",
  "applicationDeadline": "2025-12-31",
  "positions": 3,
  "category": "software"
}
```

### Update Internship (Company Only)
```http
PUT /internships/:id
Authorization: Bearer {token}
```

### Delete Internship (Company Only)
```http
DELETE /internships/:id
Authorization: Bearer {token}
```

---

## 📝 Applications

### Get My Applications (Student)
```http
GET /applications
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "internship": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Full Stack Developer Intern",
        "company": {
          "companyName": "Tech Corp"
        }
      },
      "status": "pending",
      "coverLetter": "I am excited to apply...",
      "appliedAt": "2025-11-10T10:00:00.000Z"
    }
  ]
}
```

### Apply for Internship (Student)
```http
POST /applications
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "internship": "507f1f77bcf86cd799439011",
  "coverLetter": "I am excited to apply for this position...",
  "resume": "/uploads/resumes/resume-123.pdf"
}
```

### Update Application Status (Company)
```http
PUT /applications/:id
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "accepted",
  "companyNotes": "Great candidate, start on Jan 15"
}
```

---

## 📋 Tasks

### Get Tasks
```http
GET /tasks?student={studentId}&status=submitted
Authorization: Bearer {token}
```

### Submit Task (Student)
```http
POST /tasks
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
```
application: 507f1f77bcf86cd799439013
title: Week 1 - Login Feature
description: Implemented user login functionality
type: weekly
files: [file1.pdf, screenshot.png]
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Week 1 - Login Feature",
    "status": "submitted",
    "files": [
      {
        "fileName": "design.pdf",
        "fileUrl": "/uploads/tasks/task-123.pdf",
        "fileSize": 245678
      }
    ]
  }
}
```

### Review Task (Teacher/Company)
```http
PUT /tasks/:id/review
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "rating": 4.5,
  "comments": "Good work! Consider optimizing the queries.",
  "status": "approved"
}
```

---

## 💬 Feedback

### Get Feedback
```http
GET /feedback?student={studentId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "type": "task-feedback",
      "rating": {
        "overall": 4.5,
        "technical": 5,
        "communication": 4,
        "punctuality": 5
      },
      "comments": "Excellent work on the feature implementation.",
      "givenBy": {
        "name": "Dr. Smith",
        "role": "teacher"
      },
      "createdAt": "2025-11-12T10:00:00.000Z"
    }
  ]
}
```

### Give Feedback (Teacher/Company)
```http
POST /feedback
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "student": "507f1f77bcf86cd799439011",
  "application": "507f1f77bcf86cd799439013",
  "task": "507f1f77bcf86cd799439014",
  "type": "task-feedback",
  "rating": {
    "overall": 4.5,
    "technical": 5,
    "communication": 4,
    "punctuality": 5,
    "teamwork": 4.5
  },
  "comments": "Great job!",
  "strengths": ["Quick learner", "Good communication"],
  "improvements": ["Time management"]
}
```

---

## 🔔 Notifications

### Get Notifications
```http
GET /notifications?isRead=false&limit=20
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "type": "application-reviewed",
      "title": "Application Reviewed",
      "message": "Your application for Full Stack Developer has been accepted",
      "isRead": false,
      "priority": "high",
      "link": "/student/applications/507f1f77bcf86cd799439013",
      "createdAt": "2025-11-14T09:30:00.000Z"
    }
  ],
  "unreadCount": 5
}
```

### Mark as Read
```http
PUT /notifications/:id/read
Authorization: Bearer {token}
```

### Mark All as Read
```http
PUT /notifications/read-all
Authorization: Bearer {token}
```

---

## 💬 Messages

### Get Conversations
```http
GET /messages/conversations
Authorization: Bearer {token}
```

### Get Messages
```http
GET /messages/conversation/:conversationId
Authorization: Bearer {token}
```

### Send Message
```http
POST /messages
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "recipientId": "507f1f77bcf86cd799439012",
  "content": "Hello, I have a question about the internship...",
  "messageType": "text"
}
```

---

## 🔒 Authentication Headers

All protected routes require:
```
Authorization: Bearer {accessToken}
```

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid input data. Email is required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

## 🧪 Testing with Postman

1. Import the API collection
2. Set environment variable: `API_URL = http://localhost:5000/api`
3. Login and save the `accessToken`
4. Use `{{accessToken}}` in Authorization headers

## 📦 Rate Limiting

- **General**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes
- **File uploads**: 10 requests per hour

---

**Last Updated**: November 14, 2025  
**API Version**: 1.0.0

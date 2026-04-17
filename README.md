# Lab 3: Express.js Server Mastery 🚀

A professional Event Management API built with Express.js using the **MVC (Model-View-Controller)** architecture.

## 🌟 Features

- **Standardized CRUD**: Create, Read, Update, and Delete events.
- **MVC Structure**: Clean separation of concerns (Models, Controllers, Routes).
- **Custom Middleware**:
  - `logger`: Real-time request logging with body data.
  - `measureTime`: Latency tracking for every response.
  - `validateEventInput`: Robust server-side validation.
  - `errorHandler`: Centrailized error catching.
- **RESTful Design**: Proper use of HTTP methods and status codes.
- **Automated Testing**: Built-in test suite to verify all endpoints.

## 🏗 Project Structure

```text
lab-3/
├── src/
│   ├── models/         # Data layer (In-memory storage)
│   ├── controllers/    # Business logic
│   ├── routes/         # API endpoints
│   ├── utils/          # Standardized response helpers
│   └── middleware.js   # Custom global and route middleware
├── server.js           # App entry point
├── test-api.js        # Automated CLI tests
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run the Server
```bash
# Development mode with auto-reload
npm run dev

# Standard start
npm start
```

### 3. Run Automated Tests
While the server is running, execute the following in a new terminal:
```bash
node test-api.js
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | API Information |
| **GET** | `/health` | Health Check |
| **GET** | `/api/events` | List all events |
| **GET** | `/api/events/:id` | Get event by ID |
| **POST** | `/api/events` | Create a new event |
| **PUT** | `/api/events/:id` | Update an existing event |
| **DELETE**| `/api/events/:id` | Remove an event |

---
**Instructor:** Mohamed Amine Marzouk  
**Course:** Node.js Web Development  
**Date:** January 25, 2026

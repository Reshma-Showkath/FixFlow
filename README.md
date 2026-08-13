# FixFlow

### Developer Troubleshooting Assistant

FixFlow is a developer troubleshooting application that helps developers search for common technical errors and understand how to resolve them through a structured troubleshooting path.

Instead of only providing a solution, FixFlow explains the problem through:

**Cause → Check → Solution**

## 🚀 Live Demo

**Frontend:**
https://fixflow-client-tshw.onrender.com

**Backend API:**
https://fixflow-oe6u.onrender.com

## ✨ Features

* Search developer errors and problems
* View matching troubleshooting problems
* Understand the root cause of an issue
* Follow a structured troubleshooting path
* View Cause → Check → Solution
* Responsive design for desktop and mobile
* REST API powered backend
* Production deployment using Render

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* Vite
* CSS

### Backend

* Node.js
* Express.js
* CORS
* REST API

### Database

* Cognodb

### Deployment

* GitHub
* Render

## 📁 Project Structure

```text
FixFlow/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ProblemCard.jsx
│   │   │   └── TroubleshootingPath.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## ⚙️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Reshma-Showkath/FixFlow.git
cd FixFlow
```

### 2. Start the backend

```bash
cd server
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Configure environment variables

Create a `.env` file inside the `server` directory:

```text
COGNODB_URI=your_cognodb_uri
COGNODB_USERNAME=your_cognodb_username
COGNODB_PASSWORD=your_cognodb_password
PORT=5000
```

Do not commit `.env` to GitHub.

### 4. Start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The Vite development server will provide the local frontend URL.

## 🔌 API Endpoints

### Search Problems

```text
GET /api/search?q=<search-term>
```

Example:

```text
GET /api/search?q=ECONNREFUSED
```

### Get Problem Details

```text
GET /api/problems/:id
```

Example:

```text
GET /api/problems/1
```

## 🔄 Troubleshooting Flow

FixFlow follows a simple troubleshooting model:

```text
Developer Error
      ↓
   Search
      ↓
Matching Problem
      ↓
     Cause
      ↓
     Check
      ↓
   Solution
```

This helps developers understand **why an error occurs**, rather than simply copying a solution.

## 📱 Responsive Design

The application is designed to work across:

* Desktop
* Tablet
* Mobile

The troubleshooting paths automatically adapt their layout for smaller screens.

## 🔐 Environment Variables

Sensitive credentials are stored using environment variables and are not committed to the repository.

Required backend variables:

```text
COGNODB_URI
COGNODB_USERNAME
COGNODB_PASSWORD
```

## 👤 Author

**Reshma Showkath**

GitHub:
https://github.com/Reshma-Showkath/

LinkedIn:
https://www.linkedin.com/in/reshma-showkath-77aa01241/

## 📄 License

This project was created as a technical assignment and demonstration project.

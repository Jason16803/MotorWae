# MotorWae

![Node](https://img.shields.io/badge/Node.js-18-green)
![React](https://img.shields.io/badge/React-19-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/license-MIT-blue)

MotorWae is a MERN stack vehicle inventory application built for the **WDV 463** course.
It demonstrates a full-stack architecture with a separate frontend and backend deployed to modern cloud platforms.

Users can add, view, update, and delete vehicles through a simple inventory dashboard.

---

## Live Deployment

Frontend (Vercel)  
https://motor-wae.vercel.app

Backend API (Render)  
https://motorwae.onrender.com

---

# Tech Stack

**Frontend**

* React (Vite)
* React Router
* SCSS

**Backend**

* Node.js
* Express
* MongoDB Atlas
* Mongoose

---

# Project Structure

MotorWae uses a **monorepo layout** separating the API and frontend.

```
MotorWae
│
├── apps
│   ├── api
│   │   ├── config
│   │   ├── models
│   │   ├── routes
│   │   ├── server.js
│   │   └── package.json
│   │
│   └── site
│       ├── src
│       ├── public
│       ├── vite.config.js
│       └── package.json
│
├── package.json
└── README.md
```

The root project uses **concurrently** to run both the frontend and backend during development.

---

# Running Locally

### 1. Add your MongoDB connection string

Create:

```
apps/api/.env
```

Example:

```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/motorwae
PORT=5000
```

---

### 2. Install dependencies

```
npm install
npm install --prefix apps/api
npm install --prefix apps/site
```

---

### 3. Start development servers

```
npm run dev
```

Frontend:

```
http://localhost:5173
```

API:

```
http://localhost:5000
```

---

# API Routes

| Method | Route               | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/vehicles`     | Get all vehicles     |
| GET    | `/api/vehicles/:id` | Get a single vehicle |
| POST   | `/api/vehicles`     | Add a vehicle        |
| PUT    | `/api/vehicles/:id` | Update a vehicle     |
| DELETE | `/api/vehicles/:id` | Delete a vehicle     |

Each vehicle document includes fields such as:

* year
* make
* model
* price
* mileage
* color
* transmission
* drivetrain
* created_at

---

# Deployment

MotorWae is deployed using separate services for frontend and backend.

| Service     | Platform      |
| ----------- | ------------- |
| Frontend    | Vercel        |
| Backend API | Render        |
| Database    | MongoDB Atlas |

---

# Branch Workflow

Development is separated into feature branches:

```
main → production deployments
api  → backend development
site → frontend development
```

Changes are merged into **main** through Pull Requests.

---

# Screenshots

## Home

(Add screenshot)

## Inventory

(Add screenshot)

---

# Author

Jason Haire
Full Stack Web Development Student

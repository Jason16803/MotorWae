# MotorWae

A MERN stack vehicle inventory app built for WDV 463.

**Stack:** MongoDB Atlas · Express · React · Node.js

## Running Locally

1. Add your MongoDB connection string to `apps/api/.env`:
   ```
   MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/motorwae
   PORT=5000
   ```

2. Install dependencies:
   ```bash
   npm install              # root (concurrently)
   npm install --prefix apps/api
   npm install --prefix apps/site
   ```

3. Start both servers:
   ```bash
   npm run dev
   ```
   - Frontend → http://localhost:5173
   - API → http://localhost:5000

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/vehicles` | Get all vehicles |
| GET | `/api/vehicles/:id` | Get one vehicle |
| POST | `/api/vehicles` | Add a vehicle |
| PUT | `/api/vehicles/:id` | Update a vehicle |
| DELETE | `/api/vehicles/:id` | Delete a vehicle |

## Deployment

- Database: [MongoDB Atlas](https://www.mongodb.com/atlas)
- API + Frontend: [Render](https://render.com)

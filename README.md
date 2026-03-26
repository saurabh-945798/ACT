# ACT Full Stack Assignment

This is my submission for the full stack assignment.

I built this project using React on the frontend and Node.js, Express, and MongoDB on the backend. The main idea was to keep the flow simple: user logs in, gets redirected to the dashboard, and can view dashboard sections like leads, tasks, and users.

## What is included

- Login with email and password
- Basic form validation
- MongoDB-based user authentication
- Protected routes
- Dashboard summary page
- Separate tasks and users pages
- Logout flow
- Responsive UI for desktop and mobile

## Tech stack

Frontend:
- React
- Vite
- Tailwind CSS
- Framer Motion

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- JWT

## Folder structure

- `frontend/` for the React app
- `backend/` for the API and database logic

## How to run the project

### 1. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2. Add environment variables

Create a `backend/.env` file and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX_REQUESTS=10
```

If needed, create `frontend/.env` and add:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Start the backend

```bash
cd backend
npm run dev
```

### 4. Start the frontend

```bash
cd frontend
npm run dev
```

## Demo user

I also added a demo user seed script for quick testing.

Run:

```bash
cd backend
npm run seed:demo-user
```

Demo credentials:

- Email: `saurabh@gmail.com`
- Password: `saurabh@123`

## Main routes

Frontend routes:
- `/login`
- `/register`
- `/dashboard`
- `/tasks`
- `/users`

Backend routes:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/dashboard`
- `GET /api/dashboard/tasks`
- `GET /api/dashboard/users`

## Test and build

Backend tests:

```bash
cd backend
npm test
```

Frontend lint:

```bash
cd frontend
npm run lint
```

Frontend build:

```bash
cd frontend
npm run build
```

## Notes

Along with the basic assignment requirements, I also added some extra improvements like:

- JWT authentication
- Protected backend routes
- Responsive dashboard layout
- Logout confirmation modal
- Loading states and transition loader

The goal was to keep the project clean, usable, and a little more complete than the minimum requirement.

# Startup-Connect

## Description
Startup-Connect is a full-stack web application that connects innovative startups with potential investors. It features secure authentication, Google OAuth, and a modern, responsive UI for managing startup and investor profiles.

## Features
- Startup and investor registration/login
- Google OAuth authentication
- JWT-based session management
- Profile management for startups and investors
- Dashboard with real user data
- Responsive design with Tailwind CSS

## Tech Stack
- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT, Google OAuth (passport-google-oauth20)

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Riduu1/Startup---connect.git
cd Startup---connect
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend` folder with:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
PORT=5000
```

### 4. Running the Application Locally

#### Start Backend
```bash
cd backend
npm run dev
```

#### Start Frontend
```bash
cd frontend
npm run dev
```

Frontend will run on [http://localhost:8080](http://localhost:8080) and backend on [http://localhost:5000](http://localhost:5000).

## Dependencies & Requirements

- express
- mongoose
- dotenv
- cors
- passport
- passport-google-oauth20
- jsonwebtoken
- bcryptjs
- react
- react-dom
- react-router-dom
- tailwindcss
- @vitejs/plugin-react-swc
- typescript

## Usage

1. Register or login as a startup or investor.
2. Use Google OAuth for quick sign-in.
3. Access your dashboard to view and manage your profile.

## License
MIT

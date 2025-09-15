
# 🚀 Startup-Connect – Bridging Startups & Investors

Startup-Connect is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) platform that connects innovative startups with potential investors. It features secure authentication (JWT & Google OAuth), profile management, dashboards, and a modern, responsive UI built with Tailwind CSS.

---

## 🌐 Live Demo

**Deployed Applications:**
- **Frontend:** [https://startup-connect-frontend-8ly8.onrender.com](https://startup-connect-frontend-8ly8.onrender.com)
- **Backend API:** [https://startup-connect-xb20.onrender.com](https://startup-connect-xb20.onrender.com)

---

## 🚀 Features

### 🏢 Startup Features
- **Register/Login** – Secure authentication for startups
- **Google OAuth** – Quick sign-in with Google
- **Profile Management** – Create and update startup profiles
- **Dashboard** – View submitted startups, manage team, funding, and more
- **Event Participation** – Join and create startup events

### 💼 Investor Features
- **Register/Login** – Secure authentication for investors
- **Profile Management** – Create and update investor profiles
- **Dashboard** – View and manage investment interests
- **Browse Startups** – Discover and filter startups by industry, stage, and location

### 🔒 Security & Core Features
- **JWT Authentication** – Secure sessions for all users
- **Google OAuth** – Fast, secure login
- **Role-based Dashboards** – Separate views for startups and investors
- **Responsive UI** – Built with Tailwind CSS
- **RESTful API** – Modular backend with Express.js

---

## 📦 Tech Stack

### Frontend
- **React 18** (Vite)
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **JWT**
- **Google OAuth** (passport-google-oauth20)
- **bcryptjs**
- **dotenv**
- **CORS**

---

## 🏗️ Project Structure

```
founder-invest-link/
├── backend/                # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & validation
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   ├── server.js           # Main server file
│   └── .env.example        # Environment template
├── frontend/               # Frontend app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utility functions
│   │   └── assets/         # Images & icons
│   └── package.json
├── public/                 # Static files
├── package.json            # Monorepo root
└── README.md
```

---

## 🛠 Dependencies

| Package | Purpose |
|---------|---------|
| express | Backend server framework |
| mongoose | MongoDB object modeling |
| jsonwebtoken | JWT authentication |
| bcryptjs | Password hashing |
| cors | Cross-origin resource sharing |
| dotenv | Environment variable management |
| passport-google-oauth20 | Google OAuth authentication |
| react | Frontend UI library |
| react-router-dom | Client-side routing |
| tailwindcss | CSS framework |
| typescript | Type safety |
| @vitejs/plugin-react-swc | Vite React plugin |

---

## 📋 Requirements

- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **Google OAuth credentials**

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Riduu1/Startup---connect.git
cd Startup---connect
```

### 2️⃣ Install dependencies for backend
```bash
cd backend
npm install
```

### 3️⃣ Install dependencies for frontend
```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Application Locally

### 1️⃣ Start the Backend Server
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000

### 2️⃣ Start the Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:8080

---

## 🎨 UI Components

### Frontend Components
- **Navbar** – Navigation bar with login/logout
- **Dashboard** – Role-based dashboard for startups/investors
- **Cards** – Startup, investor, and event cards
- **Forms** – Registration, login, profile, and event forms
- **Modals** – Event creation and profile editing

---

## 🔐 Security Features

- **JWT Authentication** – Secure user sessions
- **Google OAuth** – Fast, secure login
- **Password Hashing** – bcryptjs encryption
- **CORS Protection** – Cross-origin request handling
- **Environment Variables** – Sensitive data protection

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 🙏 Acknowledgements
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)


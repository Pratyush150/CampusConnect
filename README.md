<div align="center">

# 🎓 CampusConnect

### **The Ultimate Campus Social Networking Platform**

[![Stars](https://img.shields.io/github/stars/Pratyush150/CampusConnect?style=social)](https://github.com/Pratyush150/CampusConnect)
[![Issues](https://img.shields.io/github/issues/Pratyush150/CampusConnect)](https://github.com/Pratyush150/CampusConnect/issues)
[![License](https://img.shields.io/github/license/Pratyush150/CampusConnect)](LICENSE)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 📖 Overview

**CampusConnect** is a modern, full-stack social networking platform designed specifically for college campuses. Connect with classmates, share updates, collaborate on projects, and build your campus community all in one place.

### ✨ Key Features

- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 💬 **Real-time Chat** - Instant messaging powered by Socket.io
- 📸 **Media Sharing** - Upload and share images with Cloudinary integration
- 👥 **User Profiles** - Customizable profiles with bio, avatar, and more
- 🔔 **Notifications** - Stay updated with real-time notifications
- 🎯 **Campus Feed** - Share posts, updates, and connect with peers
- 🌙 **Dark Mode** - Eye-friendly dark theme support
- 📱 **Responsive Design** - Works seamlessly on all devices

---

## 🏗️ Architecture

This is a **monorepo** containing three main components:

```
CampusConnect/
├── campusconnect-frontend/    # React + Vite frontend
├── campusconnect-backend/     # Express + PostgreSQL backend
├── campusconnect/             # Additional frontend modules
└── campusconnect_backup.sql   # Database schema backup
```

---

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### Backend
- **Node.js & Express 5** - Server framework
- **PostgreSQL** - Relational database
- **Prisma** - Next-generation ORM
- **Socket.io** - WebSocket server
- **JWT** - Secure authentication
- **Cloudinary** - Media storage & CDN
- **Bcrypt** - Password hashing
- **Helmet** - Security middleware
- **Rate Limiting** - DDoS protection

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/Pratyush150/CampusConnect.git
cd CampusConnect
```

### 2. Backend Setup

```bash
cd campusconnect-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.sample .env
# Edit .env with your database credentials and API keys

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start development server
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd campusconnect-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

---

## 🔧 Environment Variables

### Backend (`.env`)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/campusconnect"

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

---

## 📱 Features Breakdown

### User Authentication
- ✅ Sign up with email verification
- ✅ Login with JWT tokens
- ✅ Password reset functionality
- ✅ Secure session management

### Social Features
- ✅ Create and share posts
- ✅ Like and comment on posts
- ✅ Follow/unfollow users
- ✅ User mentions and tagging
- ✅ Hashtag support

### Real-time Chat
- ✅ One-on-one messaging
- ✅ Group chats
- ✅ Typing indicators
- ✅ Message read receipts
- ✅ File sharing in chat

### Profile Management
- ✅ Editable user profiles
- ✅ Profile picture upload
- ✅ Bio and personal info
- ✅ Privacy settings

---

## 🗄️ Database Schema

The project uses **Prisma ORM** with PostgreSQL. Key models include:

- **User** - User accounts and profiles
- **Post** - Social feed posts
- **Comment** - Post comments
- **Like** - Post likes
- **Message** - Chat messages
- **Conversation** - Chat conversations
- **Notification** - User notifications

To view the schema:

```bash
cd campusconnect-backend
npx prisma studio
```

---

## 🛠️ Development Scripts

### Backend

```bash
npm run dev         # Start development server with nodemon
npm start           # Start production server
npm run start:prod  # Start with NODE_ENV=production
```

### Frontend

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🚢 Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Set environment variables in your hosting platform
2. Run database migrations: `npx prisma migrate deploy`
3. Build and start: `npm start`

### Frontend Deployment (Vercel, Netlify)

1. Build the app: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_URL=your_backend_url`

---

## 📸 Screenshots

*Coming soon - Add screenshots of your app here!*

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pratyush Vatsa**

- GitHub: [@Pratyush150](https://github.com/Pratyush150)
- Project Link: [https://github.com/Pratyush150/CampusConnect](https://github.com/Pratyush150/CampusConnect)

---

## 🙏 Acknowledgments

- React community for amazing tools and libraries
- Prisma for the excellent ORM
- Cloudinary for media management
- All contributors and supporters

---

<div align="center">

### ⭐ Star this repository if you find it useful!

Made with ❤️ by [Pratyush Vatsa](https://github.com/Pratyush150)

</div>

# GTA RP Creative Studio - Whitelist Application

A complete full-stack web application for managing GTA RP FiveM server whitelist applications with a beautiful creative studio theme.

## 🎨 Features

### Frontend (React + Vite)
- **Creative Studio Theme**: Beautiful parchment-style design with torn paper effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **User Authentication**: Login/signup with JWT tokens
- **Whitelist Application Form**: Comprehensive form with file uploads
- **User Dashboard**: View application status and community info
- **Admin Dashboard**: Full application and user management
- **Real-time Notifications**: Toast notifications for user feedback

### Backend (Node.js + Express)
- **JSON File Persistence**: Lightweight server-side storage (Option B)
- **File Locking**: Safe concurrent writes to prevent data corruption
- **JWT Authentication**: Secure token-based authentication
- **Admin Management**: User promotion, banning, and role management
- **Application Review System**: Approve/reject with admin notes
- **Data Export**: Export applications as JSON

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gtarp-whitelist-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and frontend development server (port 3000).

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
gtarp-whitelist-app/
├── server/                 # Backend Node.js/Express server
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   └── data/              # JSON data files (auto-created)
│       ├── users.json     # User data
│       └── apps.json      # Application data
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── package.json           # Root package.json
```

## 🎯 Features Overview

### Public Pages
- **Landing Page**: Project introduction with call-to-action
- **Signup Page**: User registration with role requests
- **Login Page**: User authentication

### Protected Pages (User)
- **User Dashboard**: View application status and account info
- **Whitelist Application Form**: Submit application with all required fields

### Protected Pages (Admin)
- **Admin Dashboard**: 
  - View all applications with search/filter
  - Review applications (approve/reject)
  - Manage users (promote to admin, ban/unban)
  - Export applications as JSON

### Application Form Fields
- In-game name (required)
- Real name (optional)
- Age
- Discord tag
- Experience level (Beginner/Intermediate/Advanced)
- Roleplay sample (300-1000 characters, required)
- Why should you join? (optional)
- Attachments (screenshots/avatars)
- Agreement to rules (required)

## 🎨 Creative Studio Theme

The application features a beautiful creative studio aesthetic inspired by:
- **Parchment-style cards** with torn paper effects
- **Dark green textured background** with subtle patterns
- **Sepia-toned photo effects** for application cards
- **Elegant typography** using Playfair Display and Source Serif Pro
- **Gold accents** and embossed button effects
- **Ivy and lightbulb decorative elements**

### CSS Variables
The theme uses CSS custom properties for easy customization:
```css
--color-beige: #f5f1e8;
--color-dark-green: #2c4a3e;
--color-sepia-brown: #8b7355;
--color-accent-gold: #d4af37;
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=5000
JWT_SECRET=your-secret-key-here
```

### Backend Configuration
The server automatically creates the data directory and JSON files on first run. File locking ensures safe concurrent writes.

### Frontend Configuration
The Vite configuration includes a proxy to the backend API for development. Update `client/vite.config.js` if you change the backend port.

## 📊 Data Persistence

This application uses **Option B - Lightweight server JSON persistence**:
- Data stored in `server/data/users.json` and `server/data/apps.json`
- File locking prevents concurrent write conflicts
- No database server required
- Easy backup and migration

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side validation for all forms
- **File Upload Security**: Base64 encoding for attachments
- **Admin Authorization**: Role-based access control

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables
3. Deploy using Git:
   ```bash
   git push heroku main
   ```

### VPS Deployment
1. Build the frontend: `npm run build`
2. Set up PM2 for the backend
3. Configure nginx as reverse proxy
4. Set up SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Check the documentation

## 🎮 GTA RP Integration

This whitelist system is designed for FiveM servers and includes:
- Discord integration support
- Server connection information
- Community guidelines
- Roleplay-focused application process

---

**Built with ❤️ for the GTA RP community**

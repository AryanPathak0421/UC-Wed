# UtsavChakra Backend API

Backend API for UtsavChakra Wedding Planning Platform

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB (make sure it's running on your system)

5. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📁 Project Structure

```
Backend/
├── modules/
│   └── user/
│       ├── auth.controller.js      # Authentication logic
│       ├── user.controller.js      # User management
│       ├── auth.routes.js          # Authentication routes
│       ├── user.routes.js          # User routes
│       ├── auth.service.js         # Authentication service
│       ├── user.model.js           # User schema
│       └── index.js                # Module exports
├── middleware/
│   └── auth.middleware.js          # Authentication middleware
├── utils/
│   ├── emailService.js             # Email utilities
│   └── otpService.js               # OTP utilities
├── uploads/                        # File uploads
├── .env                            # Environment variables
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore file
├── package.json                    # Dependencies
├── server.js                       # Server entry point
└── README.md                       # This file
```

## 🔐 Authentication Features

### User Registration
- Email and phone verification
- Password hashing with bcrypt
- OTP-based verification system
- Account validation

### User Login
- JWT-based authentication
- Session management
- Remember me functionality
- Login tracking

### Password Management
- Forgot password functionality
- Secure password reset tokens
- Password change functionality
- Account deletion

### Verification System
- Email verification with OTP
- Phone verification with OTP
- Resend OTP functionality
- Rate limiting for security

## 📡 API Endpoints

### Authentication
- `POST /api/user/auth/register` - Register new user
- `POST /api/user/auth/login` - User login
- `POST /api/user/auth/verify-email` - Verify email
- `POST /api/user/auth/verify-phone` - Verify phone
- `POST /api/user/auth/resend-otp` - Resend OTP
- `POST /api/user/auth/forgot-password` - Forgot password
- `POST /api/user/auth/reset-password` - Reset password
- `GET /api/user/auth/me` - Get current user
- `POST /api/user/auth/logout` - Logout

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `POST /api/user/profile/change-password` - Change password
- `POST /api/user/profile/delete-account` - Delete account
- `GET /api/user/profile/family` - Get family members
- `POST /api/user/profile/family` - Add family member
- `PUT /api/user/profile/family/:id` - Update family member
- `DELETE /api/user/profile/family/:id` - Remove family member
- `GET /api/user/profile/stats` - Get user statistics
- `GET /api/user/profile/preferences` - Get preferences
- `PUT /api/user/profile/preferences` - Update preferences

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation and sanitization
- CORS protection
- Helmet.js for security headers
- MongoDB injection protection
- XSS protection

## 📧 Email Service

The application uses Nodemailer for email services:
- Email verification
- Welcome emails
- Password reset emails

Configure in `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📱 SMS Service

Optional SMS service for phone verification (Twilio integration ready):
```
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

## 🗄️ Database Schema

### User Model
- Personal information (name, email, phone)
- Wedding details (date, city)
- Verification status (email, phone)
- Preferences and settings
- Family members
- Social links
- Activity tracking

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## 📝 Environment Variables

Key environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection | mongodb://localhost:27017/utsav-chakra |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration | 7d |
| EMAIL_USER | Email username | - |
| EMAIL_PASS | Email password | - |
| FRONTEND_URL | Frontend URL | http://localhost:5173 |

## 🚀 Deployment

### Production Setup

1. Set environment variables
2. Build the application
3. Start with PM2 or similar:
```bash
pm2 start server.js --name "utsav-chakra-api"
```

### Docker Support (Coming Soon)

```dockerfile
# Dockerfile will be added
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@utsavchakra.com
- Documentation: [Link to docs]
- Issues: [Link to GitHub issues]

## 🔄 API Version

Current API Version: v1.0.0

## 📊 Monitoring

The server includes:
- Health check endpoint: `/health`
- Request logging with Morgan
- Error tracking
- Performance monitoring (basic)

## 🔧 Development Tools

- ESLint for code quality
- Prettier for code formatting
- Nodemon for development
- Jest for testing

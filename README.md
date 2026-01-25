# LegalEye Backend API (In Progress)

A secure and scalable backend API for LegalEye platform built with Node.js, Express, and MongoDB. This API provides complete user authentication, profile management, and file upload capabilities with industry-standard security practices.

---

## 🚀 Features

### User Authentication

- **User Registration** with avatar upload
- **Secure Login/Logout** with JWT-based authentication
- **Access Token & Refresh Token** mechanism for session management
- **Token Refresh** endpoint for seamless user experience

### User Profile Management

- **View User Profile** (authenticated)
- **Update Profile Avatar** with Cloudinary integration
- **Change Password** with old password verification
- **Update Email** with uniqueness validation

### File Upload

- **Avatar Upload** using Multer and Cloudinary
- **Automatic file cleanup** after upload
- **Multipart form data** parsing for file and text fields

---

## 🔒 Security Features

### Authentication & Authorization

- **JWT (JSON Web Tokens)** for stateless authentication
- **Dual Token System**:
  - Short-lived access tokens
  - Long-lived refresh tokens for token renewal
- **HTTP-only Cookies** to prevent XSS attacks
- **Secure Cookie Flag** for HTTPS-only transmission
- **Bearer Token Support** via Authorization header

### Password Security

- **Bcrypt Hashing** with salt rounds (10) for password encryption
- **Password Validation** before updates
- **Password field exclusion** from API responses using `.select("-password")`

### Input Validation & Error Handling

- **Required field validation** for all endpoints
- **Email uniqueness** checks to prevent duplicates
- **Centralized error handling** middleware
- **Structured error responses** with status codes and messages

### CORS Configuration

- **Cross-Origin Resource Sharing** configured for allowed origins
- Environment-based CORS origin control

### Middleware Security

- **Cookie Parser** for secure cookie handling
- **JWT Verification Middleware** for protected routes
- **Multer** for safe file upload handling

---

## 📂 Project Structure

```
backend/
├── src/
│   ├── app.js                    # Express app configuration
│   ├── index.js                  # Server entry point
│   ├── constants.js              # Application constants
│   │
│   ├── controllers/              # Business logic layer
│   │   └── user.controllers.js   # User operations (register, login, profile, etc.)
│   │
│   ├── models/                   # Database schemas
│   │   ├── users.model.js        # User schema with bcrypt & JWT methods
│   │   ├── pdf.models.js         # PDF document schema
│   │   └── Grouping.model.js     # Grouping/categorization schema
│   │
│   ├── routes/                   # API endpoints
│   │   └── user.routes.js        # User-related routes
│   │
│   ├── middlewares/              # Custom middleware
│   │   ├── auth.middleware.js    # JWT verification middleware
│   │   └── multer.middleware.js  # File upload middleware
│   │
│   ├── utils/                    # Utility functions
│   │   ├── asynchandler.js       # Async error wrapper
│   │   ├── cloudinary.js         # Cloudinary upload helper
│   │   ├── error_structurer.js   # Custom error class
│   │   └── responseHandler.js    # Standardized API response
│   │
│   └── db/                       # Database configuration
│       └── index.js              # MongoDB connection
│
├── public/                       # Static files
│   └── temp/                     # Temporary file storage for uploads
│
└── package.json                  # Project dependencies
```

---

## 🏗️ Code Architecture & Patterns

### 1. **MVC Pattern (Model-View-Controller)**

- **Models**: Mongoose schemas with business logic methods
- **Controllers**: Handle request/response logic
- **Routes**: Define API endpoints and middleware chains

### 2. **Middleware Chain Pattern**

```javascript
router
  .route("/updateprofileavatar")
  .put(verifyJWT, upload.single("avatar"), updateuseravatar);
```

- `verifyJWT`: Authentication check
- `upload.single('avatar')`: File upload handling
- `updateuseravatar`: Controller logic

### 3. **Async Error Handling Wrapper**

```javascript
export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error); // Pass to error middleware
  }
};
```

- Eliminates repetitive try-catch blocks
- Centralizes error handling

### 4. **Custom Error Structure**

```javascript
throw new error_structurer(400, "User already exists");
```

- Consistent error format across the application
- Status code and message bundled together

### 5. **Standardized API Response**

```javascript
return res
  .status(200)
  .json(new responseHandler(200, "User created successfully", createduser));
```

- Uniform response structure for all endpoints
- Easy to consume on frontend

### 6. **Schema Methods Pattern**

```javascript
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
```

- Business logic encapsulated in model
- Reusable across controllers

### 7. **Pre-save Hooks**

```javascript
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

- Automatic password hashing before saving
- Prevents storing plain text passwords

---

## 📡 API Endpoints

### Public Routes

| Method | Endpoint                           | Description          | Body                                             |
| ------ | ---------------------------------- | -------------------- | ------------------------------------------------ |
| POST   | `/api/v1/users/register`           | Register new user    | `name, username, email, password, avatar (file)` |
| POST   | `/api/v1/users/login`              | User login           | `email, password`                                |
| POST   | `/api/v1/users/refreshAccessToken` | Refresh access token | `refreshToken (cookie)`                          |

### Protected Routes (Require JWT)

| Method | Endpoint                            | Description      | Body                       |
| ------ | ----------------------------------- | ---------------- | -------------------------- |
| POST   | `/api/v1/users/logout`              | Logout user      | -                          |
| GET    | `/api/v1/users/profile`             | Get user profile | -                          |
| PUT    | `/api/v1/users/updateprofileavatar` | Update avatar    | `avatar (file)`            |
| PUT    | `/api/v1/users/updatepassword`      | Change password  | `oldpassword, newpassword` |
| PUT    | `/api/v1/users/updateemail`         | Update email     | `newemail`                 |

---

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud storage for images
- **Cookie-parser** - Cookie handling
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variable management

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd LegalEye/backend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file in the backend root

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000

JWT_SECRET=your_access_token_secret
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d

cloudinary_name=your_cloudinary_name
cloudinary_api_key=your_cloudinary_api_key
cloudinary_api_secret=your_cloudinary_api_secret
```

4. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

---

## 📝 Code Style & Best Practices

### ✅ Implemented Best Practices

- **Environment Variables** for sensitive data
- **Centralized Error Handling** middleware
- **Async/Await** with proper error catching
- **Password Hashing** before storage
- **JWT Token Expiry** management
- **File Cleanup** after uploads
- **Input Validation** on all endpoints
- **Modular Code Structure** for maintainability
- **Cookie Security** (httpOnly, secure flags)
- **Database Indexing** on frequently queried fields

### 📋 Code Conventions

- ES6+ syntax with **imports/exports**
- **Async/await** over callbacks
- **Arrow functions** for cleaner syntax
- **Descriptive variable names**
- **Single responsibility** for functions
- **Error-first** approach

---

## 🔄 Token Flow

```
1. User Login
   ↓
2. Generate Access Token (short-lived) + Refresh Token (long-lived)
   ↓
3. Store Refresh Token in DB + Both tokens in HTTP-only cookies
   ↓
4. Access Token expires
   ↓
5. Client calls /refreshAccessToken with Refresh Token
   ↓
6. Verify Refresh Token from DB
   ↓
7. Issue new Access Token
   ↓
8. Continue authenticated requests
```

---

## 🧪 Testing Endpoints

### Using cURL

**Register User**

```bash
curl -X POST http://localhost:8000/api/v1/users/register \
  -F "name=John Doe" \
  -F "username=johndoe" \
  -F "email=john@example.com" \
  -F "password=secret123" \
  -F "avatar=@/path/to/image.jpg"
```

**Login**

```bash
curl -X POST http://localhost:8000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'
```

**Get Profile** (with token)

```bash
curl -X GET http://localhost:8000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🐛 Error Response Format

```json
{
  "statusCode": 400,
  "message": "User already exists",
  "errors": []
}
```

## ✅ Success Response Format

```json
{
  "statusCode": 200,
  "message": "User created successfully",
  "data": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com",
    "avatar": "https://...",
    "createdAt": "2026-01-25T10:30:00.000Z"
  }
}
```

---

## 📌 Future Enhancements

- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] Rate limiting for API endpoints
- [ ] Request validation with Joi/Zod
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Logging with Winston/Morgan
- [ ] Redis for session management

---

## 📄 License

ISC

---

## 👨‍💻 Author

Developed with ❤️ for LegalEye Platform

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note**: Make sure to never commit `.env` file or expose sensitive credentials.

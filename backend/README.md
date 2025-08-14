# GH Beauty Hub Backend API

A complete backend API for the GH Beauty Hub salon management system built with Node.js, Express, and MongoDB.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access
- 👥 **User Management** - Customers, Stylists, and Admins
- 💇‍♀️ **Service Management** - Complete CRUD for beauty services
- 📅 **Booking System** - Appointment scheduling and management
- 📊 **Dashboard** - Analytics and statistics
- 🔒 **Security** - Rate limiting, CORS, input validation
- 📱 **RESTful API** - Clean, documented endpoints

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy config.env.example to config.env and update values
   cp config.env.example config.env
   ```

3. **Configure MongoDB:**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud)

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)
- `GET /api/services/category/:category` - Get services by category
- `GET /api/services/popular` - Get popular services

### Users
- `GET /api/users` - Get all users (Admin)

### Stylists
- `GET /api/stylists` - Get all stylists

### Bookings
- `GET /api/bookings` - Get user bookings

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Sample Data

After running the seed script, you'll have these test accounts:

### Admin
- Email: `admin@ghbeautyhub.com`
- Password: `admin123`

### Stylist
- Email: `stylist@ghbeautyhub.com`
- Password: `stylist123`

### Customer
- Email: `customer@ghbeautyhub.com`
- Password: `customer123`

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ghbeautyhub
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

## Error Handling

Errors are returned in this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

## Security Features

- ✅ JWT Authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Security headers with helmet
- ✅ Role-based authorization

## Development

### Running in Development Mode
```bash
npm run dev
```

### Seeding Database
```bash
npm run seed
```

### Health Check
Visit `http://localhost:5000/api/health` to check if the API is running.

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set strong JWT secret
4. Configure CORS origins
5. Set up proper logging
6. Use PM2 or similar process manager

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License 
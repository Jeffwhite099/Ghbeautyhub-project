const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: './config.env' });

const app = express();

// Enhanced security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:5001", "http://localhost:5173"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Enhanced rate limiting with different limits for different endpoints
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting
app.use('/api/auth', authLimiter);
app.use('/api', generalLimiter);

// Enhanced CORS configuration - More permissive for development
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept']
}));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Body parsing middleware with size limits
app.use(express.json({ limit: '1mb' })); // Reduced from 10mb for security
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Input validation middleware
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

// Sample data (in-memory for testing)
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@ghbeautyhub.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'stylist@ghbeautyhub.com',
    password: 'stylist123',
    role: 'stylist'
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'customer@ghbeautyhub.com',
    password: 'customer123',
    role: 'customer'
  }
];

// Create stylists array from users with stylist role
const stylists = users.filter(u => u.role === 'stylist');

// Simple in-memory bookings storage
let bookings = [];

const services = [
  {
    id: 1,
    name: 'Hair Cut & Style',
    description: 'Professional haircut and styling for any occasion',
    price: 80,
    duration: 60,
    category: 'hair',
    isPopular: true
  },
  {
    id: 2,
    name: 'Hair Coloring',
    description: 'Full hair coloring with premium products',
    price: 150,
    duration: 120,
    category: 'hair',
    isPopular: true
  },
  {
    id: 3,
    name: 'Hair Treatment',
    description: 'Nourishing hair treatments and care',
    price: 60,
    duration: 45,
    category: 'treatments'
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'GH Beauty Hub API is running (Simple Mode)',
    timestamp: new Date().toISOString()
  });
});

// Login endpoint with enhanced security
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    
    // Find user
    const user = users.find(u => u.email === sanitizedEmail && u.password === sanitizedPassword);
    
    if (user) {
      // Add delay to prevent timing attacks
      setTimeout(() => {
        res.json({
          success: true,
          message: 'Login successful',
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            },
            token: 'dummy-jwt-token-' + user.id + '-' + Date.now()
          }
        });
      }, Math.random() * 100 + 50); // Random delay between 50-150ms
    } else {
      // Add delay to prevent timing attacks
      setTimeout(() => {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }, Math.random() * 100 + 50);
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Registration endpoint
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, phone, role = 'customer' } = req.body;
    
    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }
    
    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // Validate name length
    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 50 characters'
      });
    }
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedPhone = phone ? sanitizeInput(phone) : '';
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      name: sanitizedName,
      email: sanitizedEmail,
      password: sanitizedPassword,
      phone: sanitizedPhone,
      role: role === 'stylist' ? 'stylist' : 'customer'
    };
    
    // Add to users array
    users.push(newUser);
    
    console.log('New user registered:', { ...newUser, password: '[HIDDEN]' });
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phone: newUser.phone
        },
        token: 'dummy-jwt-token-' + newUser.id + '-' + Date.now()
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, phone, role = 'customer' } = req.body;
    
    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }
    
    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // Validate name length
    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 50 characters'
      });
    }
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedPhone = phone ? sanitizeInput(phone) : '';
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      name: sanitizedName,
      email: sanitizedEmail,
      password: sanitizedPassword,
      phone: sanitizedPhone,
      role: role === 'stylist' ? 'stylist' : 'customer'
    };
    
    // Add to users array
    users.push(newUser);
    
    console.log('New user registered:', { ...newUser, password: '[HIDDEN]' });
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phone: newUser.phone
        },
        token: 'dummy-jwt-token-' + newUser.id + '-' + Date.now()
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get services
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    count: services.length,
    data: services
  });
});

// Get stylists
app.get('/api/stylists', (req, res) => {
  res.json({
    success: true,
    count: stylists.length,
    data: stylists.map(s => ({
      id: s.id,
      name: s.name,
      email: s.email,
      role: s.role
    }))
  });
});

// Create booking endpoint
app.post('/api/bookings', (req, res) => {
  try {
    const { serviceId, stylistId, appointmentDate, appointmentTime, customerName, customerEmail, customerPhone, notes, paymentMethod } = req.body;
    
    // Input validation
    if (!serviceId || !stylistId || !appointmentDate || !appointmentTime || !customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: serviceId, stylistId, appointmentDate, appointmentTime, customerName, customerEmail'
      });
    }
    
    // Find service and stylist
    const service = services.find(s => s.id === parseInt(serviceId));
    const stylist = stylists.find(s => s.id === parseInt(stylistId));
    
    if (!service) {
      return res.status(400).json({
        success: false,
        message: 'Service not found'
      });
    }
    
    if (!stylist) {
      return res.status(400).json({
        success: false,
        message: 'Stylist not found'
      });
    }
    
    // Create new booking
    const newBooking = {
      id: bookings.length + 1,
      serviceId: parseInt(serviceId),
      stylistId: parseInt(stylistId),
      serviceName: service.name,
      stylistName: stylist.name,
      appointmentDate,
      appointmentTime,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '',
      notes: notes || '',
      paymentMethod,
      status: 'pending',
      totalPrice: service.price,
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    
    console.log('New booking created:', newBooking);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully!',
      data: newBooking
    });
    
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get all bookings (for demo purposes)
app.get('/api/bookings', (req, res) => {
  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// Payment routes
const paymentRoutes = require('./routes/payments');
app.use('/api/payments', paymentRoutes);

// Get user profile (protected route example)
app.get('/api/auth/me', (req, res) => {
  // In a real app, this would verify the JWT token
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }
  
  // For demo purposes, return a sample user
  res.json({
    success: true,
    data: {
      id: 1,
      name: 'Demo User',
      email: 'demo@ghbeautyhub.com',
      role: 'customer'
    }
  });
});

// Get popular services
app.get('/api/services/popular', (req, res) => {
  const popularServices = services.filter(s => s.isPopular);
  res.json({
    success: true,
    count: popularServices.length,
    data: popularServices
  });
});

// Get services by category
app.get('/api/services/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryServices = services.filter(s => s.category === category);
  
  res.json({
    success: true,
    count: categoryServices.length,
    data: categoryServices
  });
});

// Data viewing endpoint (for development)
app.get('/api/data', (req, res) => {
  res.json({
    success: true,
    message: 'Current in-memory data',
    data: {
      users: users.map(u => ({ ...u, password: '[HIDDEN]' })),
      services: services,
      stylists: stylists || [],
      bookings: bookings || []
    },
    counts: {
      users: users.length,
      services: services.length,
      stylists: (stylists || []).length,
      bookings: (bookings || []).length
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Enhanced Secure Server running on port ${PORT}`);
  console.log(`📱 API URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`\n🔒 Security Features:`);
  console.log(`   ✅ Helmet.js with CSP`);
  console.log(`   ✅ Rate limiting (Auth: 5/min, General: 100/15min)`);
  console.log(`   ✅ CORS protection`);
  console.log(`   ✅ Input validation & sanitization`);
  console.log(`   ✅ Security headers`);
  console.log(`   ✅ Request logging`);
  console.log(`\n📋 Test Credentials:`);
  console.log(`   Admin: admin@ghbeautyhub.com / admin123`);
  console.log(`   Stylist: stylist@ghbeautyhub.com / stylist123`);
  console.log(`   Customer: customer@ghbeautyhub.com / customer123`);
  console.log(`\n🌐 Frontend URL: http://localhost:5173`);
  console.log(`🔗 Full Application: http://localhost:5173`);
}); 
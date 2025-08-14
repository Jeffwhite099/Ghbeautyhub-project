# 🚀 Payment System Setup Guide

## 📋 Overview
This guide will help you set up a complete payment processing system for GH Beauty Hub using Stripe. The system includes:
- Secure backend payment endpoints
- Frontend checkout form with Stripe Elements
- Payment success/failure handling
- Comprehensive security measures

## 🛠️ Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Stripe account (free tier available)

## 🔑 Step 1: Get Stripe API Keys

### 1.1 Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete account verification
3. Access your dashboard

### 1.2 Get API Keys
1. In Stripe Dashboard, go to **Developers** → **API keys**
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. **Important**: Keep your secret key secure and never expose it in frontend code

## ⚙️ Step 2: Configure Environment Variables

### 2.1 Backend Configuration
Update `backend/config.env`:
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Server Configuration
PORT=5001
NODE_ENV=development

# Security
SESSION_SECRET=your_session_secret_here_change_in_production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Origins
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173
```

### 2.2 Frontend Configuration
Update `src/config.js`:
```javascript
export const config = {
  // Stripe Configuration
  STRIPE_PUBLISHABLE_KEY: 'pk_test_your_actual_publishable_key_here',
  
  // API Configuration
  API_BASE_URL: 'http://localhost:5001/api',
  
  // App Configuration
  APP_NAME: 'GH Beauty Hub',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  ENABLE_PAYMENTS: true,
  ENABLE_ANALYTICS: false,
};
```

## 🚀 Step 3: Install Dependencies

### 3.1 Backend Dependencies
```bash
cd backend
npm install stripe dotenv
```

### 3.2 Frontend Dependencies
```bash
cd ..
yarn add @stripe/stripe-js @stripe/react-stripe-js
```

## 🔧 Step 4: Start the Application

### 4.1 Start Backend Server
```bash
cd backend
node server-simple.js
```
The server will start on `http://localhost:5001`

### 4.2 Start Frontend Development Server
```bash
cd ..
yarn dev
```
The frontend will start on `http://localhost:5173`

## 🧪 Step 5: Test the Payment System

### 5.1 Test Card Numbers
Use these test card numbers for testing:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`

### 5.2 Test Payment Flow
1. Navigate to `/checkout`
2. Fill in the form with test data
3. Use test card number `4242 4242 4242 4242`
4. Use any future expiry date
5. Use any 3-digit CVC
6. Submit the form

## 🔒 Security Features Implemented

### Backend Security
- **Helmet.js**: Security headers and CSP
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Sanitizes all inputs
- **CORS Protection**: Configurable origin restrictions
- **Environment Variables**: Secure configuration management

### Frontend Security
- **Stripe Elements**: PCI-compliant card input
- **Client-side Validation**: Form validation
- **Secure API Calls**: HTTPS-only in production
- **No Sensitive Data Storage**: Payment data never stored locally

## 📱 Available Payment Endpoints

### Backend API Routes
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm-payment` - Confirm payment
- `GET /api/payments/payment-status/:id` - Get payment status
- `POST /api/payments/webhook` - Stripe webhook handler

### Frontend Routes
- `/checkout` - Checkout form
- Payment success/failure handling
- Receipt generation (placeholder)

## 🎯 Customization Options

### Supported Currencies
- USD (default)
- EUR
- GBP

### Payment Methods
- Credit/Debit Cards (automatic)
- Future: Digital wallets, bank transfers

### Amount Limits
- Minimum: $0.50
- Maximum: No limit (configurable)

## 🚨 Troubleshooting

### Common Issues

#### 1. "Stripe failed to load"
- Check your publishable key in `src/config.js`
- Ensure internet connection
- Check browser console for errors

#### 2. "Payment intent creation failed"
- Verify backend server is running
- Check Stripe secret key in `backend/config.env`
- Ensure all required fields are filled

#### 3. "CORS error"
- Check CORS configuration in `backend/server-simple.js`
- Verify frontend URL is in allowed origins

#### 4. "Rate limit exceeded"
- Wait 15 minutes or restart backend server
- Check rate limiting configuration

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in backend config.

## 🔄 Production Deployment

### Environment Variables
1. Use production Stripe keys
2. Set `NODE_ENV=production`
3. Configure proper CORS origins
4. Set up webhook endpoints

### Security Checklist
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Rate limiting configured
- [ ] CORS origins restricted
- [ ] Webhook signature verification enabled
- [ ] Error messages sanitized

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Stripe documentation
3. Check browser console and server logs
4. Verify all configuration steps completed

## 🎉 Success!
Once configured, your payment system will:
- Accept secure credit card payments
- Process payments through Stripe
- Handle success/failure scenarios
- Provide detailed payment confirmations
- Maintain PCI compliance standards

---

**Note**: This is a development setup. For production, ensure all security measures are properly configured and tested.

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { usePayment } from '../contexts/PaymentContext';
import toast from 'react-hot-toast';

// Stripe card element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

// Checkout form component
const CheckoutFormComponent = ({ onSuccess, onCancel }) => {
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const { createPaymentIntent, confirmPayment, loading } = usePayment();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    amount: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Customer email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }
    
    if (!formData.amount || parseFloat(formData.amount) < 0.5) {
      newErrors.amount = 'Amount must be at least $0.50';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Service description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      toast.error('Stripe has not loaded yet. Please try again.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const paymentIntentData = {
        amount: parseFloat(formData.amount),
        currency: 'usd',
        description: formData.description,
        customerEmail: formData.customerEmail,
        metadata: {
          customerName: formData.customerName,
          service: formData.description,
        },
      };

      const { clientSecret, paymentIntentId } = await createPaymentIntent(paymentIntentData);

      // Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.customerName,
            email: formData.customerEmail,
          },
        },
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm payment with backend
        await confirmPayment(paymentIntentId);
        
        toast.success('Payment successful!');
        onSuccess?.(paymentIntent);
        
        // Reset form
        setFormData({
          customerName: '',
          customerEmail: '',
          amount: '',
          description: '',
        });
        elements.getElement(CardElement).clear();
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Customer Name"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            error={!!errors.customerName}
            helperText={errors.customerName}
            required
            disabled={isProcessing}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Customer Email"
            type="email"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            error={!!errors.customerEmail}
            helperText={errors.customerEmail}
            required
            disabled={isProcessing}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Amount (USD)"
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            error={!!errors.amount}
            helperText={errors.amount || 'Minimum $0.50'}
            required
            disabled={isProcessing}
            inputProps={{ min: 0.5, step: 0.01 }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Service Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            required
            disabled={isProcessing}
            placeholder="e.g., Hair Styling, Manicure"
          />
        </Grid>
        
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2, backgroundColor: '#fafafa' }}>
            <Typography variant="subtitle2" gutterBottom>
              Payment Information
            </Typography>
            <CardElement options={cardElementOptions} />
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!stripe || isProcessing || loading}
          sx={{ minWidth: 120 }}
        >
          {isProcessing ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            `Pay $${formData.amount || '0.00'}`
          )}
        </Button>
      </Box>

      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Test Card:</strong> Use 4242 4242 4242 4242 for successful payments
        </Typography>
      </Alert>
    </Box>
  );
};

// Main checkout form wrapper with Stripe Elements
const CheckoutForm = ({ onSuccess, onCancel }) => {
  const { stripe, loading } = usePayment();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!stripe) {
    return (
      <Alert severity="error">
        Stripe failed to load. Please refresh the page and try again.
      </Alert>
    );
  }

  return (
    <Elements stripe={stripe}>
      <CheckoutFormComponent onSuccess={onSuccess} onCancel={onCancel} />
    </Elements>
  );
};

export default CheckoutForm;

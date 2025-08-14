import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  Payment,
  Receipt,
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { usePayment } from '../contexts/PaymentContext';

const steps = ['Payment Details', 'Processing', 'Confirmation'];

const Checkout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { paymentStatus } = usePayment();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentData, setPaymentData] = useState(null);

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentData(paymentIntent);
    setActiveStep(2);
  };

  const handleCancel = () => {
    navigate('/services');
  };

  const handleBackToServices = () => {
    navigate('/services');
  };

  const handleViewReceipt = () => {
    // In a real app, you would generate and show a receipt
    alert('Receipt functionality coming soon!');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Complete Your Payment
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Please fill in your payment details below. All payments are processed securely through Stripe.
            </Typography>
            <CheckoutForm
              onSuccess={handlePaymentSuccess}
              onCancel={handleCancel}
            />
          </Box>
        );

      case 1:
        return (
          <Box textAlign="center" py={4}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Processing Payment...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we process your payment securely.
            </Typography>
          </Box>
        );

      case 2:
        return (
          <Box textAlign="center" py={4}>
            <CheckCircle
              sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
            />
            <Typography variant="h4" gutterBottom>
              Payment Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Thank you for your payment. Your transaction has been completed successfully.
            </Typography>
            
            {paymentStatus && (
              <Paper variant="outlined" sx={{ p: 3, mt: 3, maxWidth: 400, mx: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Payment Details
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2">
                    <strong>Amount:</strong> ${paymentStatus.amount}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Currency:</strong> {paymentStatus.currency?.toUpperCase()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Transaction ID:</strong> {paymentStatus.id}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> {new Date(paymentStatus.created * 1000).toLocaleDateString()}
                  </Typography>
                </Box>
              </Paper>
            )}

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleViewReceipt}
                startIcon={<Receipt />}
              >
                View Receipt
              </Button>
              <Button
                variant="contained"
                onClick={handleBackToServices}
                startIcon={<Payment />}
              >
                Book Another Service
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Checkout
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ my: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          {activeStep === 0 && (
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                <strong>Security Note:</strong> Your payment information is encrypted and never stored on our servers. 
                We use Stripe for secure payment processing.
              </Typography>
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Checkout;

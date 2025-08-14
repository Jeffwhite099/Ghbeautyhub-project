import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  Receipt,
  Home,
  Payment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = ({ paymentData }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleViewReceipt = () => {
    // In a real app, you would generate and show a receipt
    alert('Receipt functionality coming soon!');
  };

  const handleBookAnother = () => {
    navigate('/services');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <CheckCircle
          sx={{
            fontSize: 80,
            color: 'success.main',
            mb: 3,
          }}
        />

        <Typography variant="h4" gutterBottom color="success.main">
          Payment Successful!
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your payment. Your transaction has been completed successfully.
        </Typography>

        {paymentData && (
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mt: 3,
              mb: 4,
              backgroundColor: theme.palette.grey[50],
            }}
          >
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Grid container spacing={2} sx={{ textAlign: 'left' }}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Amount:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  ${paymentData.amount}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Currency:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {paymentData.currency?.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Transaction ID:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                  {paymentData.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Date:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {new Date(paymentData.created * 1000).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={handleViewReceipt}
            startIcon={<Receipt />}
            size="large"
          >
            View Receipt
          </Button>
          <Button
            variant="contained"
            onClick={handleBookAnother}
            startIcon={<Payment />}
            size="large"
          >
            Book Another Service
          </Button>
          <Button
            variant="text"
            onClick={handleGoHome}
            startIcon={<Home />}
            size="large"
          >
            Go Home
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, fontStyle: 'italic' }}
        >
          A confirmation email has been sent to your email address.
        </Typography>
      </Paper>
    </Box>
  );
};

export default PaymentSuccess;

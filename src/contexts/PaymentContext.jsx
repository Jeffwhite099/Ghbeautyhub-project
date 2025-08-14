import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const PaymentContext = createContext({});

import { config } from '../config';

// Load Stripe (will be configured with your publishable key)
const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const stripeInstance = await stripePromise;
        setStripe(stripeInstance);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load Stripe:', error);
        setLoading(false);
      }
    };

    initializeStripe();
  }, []);

  const createPaymentIntent = async (paymentData) => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5001/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment intent');
      }

      return data;
    } catch (error) {
      console.error('Payment intent creation error:', error);
      toast.error(error.message || 'Failed to create payment intent');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (paymentIntentId) => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5001/api/payments/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentIntentId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to confirm payment');
      }

      setPaymentStatus(data.payment);
      return data;
    } catch (error) {
      console.error('Payment confirmation error:', error);
      toast.error(error.message || 'Failed to confirm payment');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatus = async (paymentIntentId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/payments/payment-status/${paymentIntentId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get payment status');
      }

      setPaymentStatus(data.payment);
      return data;
    } catch (error) {
      console.error('Payment status check error:', error);
      throw error;
    }
  };

  const resetPaymentStatus = () => {
    setPaymentStatus(null);
  };

  const value = {
    stripe,
    loading,
    paymentStatus,
    createPaymentIntent,
    confirmPayment,
    getPaymentStatus,
    resetPaymentStatus,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

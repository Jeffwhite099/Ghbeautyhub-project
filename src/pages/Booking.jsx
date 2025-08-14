import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Chip,
  Alert,
  Divider,
  Paper,
  useTheme,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import {
  Spa,
  Person,
  AccessTime,
  Payment,
  CheckCircle,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

const Booking = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const steps = ['Service Selection', 'Stylist & Time', 'Personal Details', 'Payment'];

  const services = [
    { id: 1, name: 'Hair Cut & Style', price: 80, duration: 60, category: 'hair' },
    { id: 2, name: 'Hair Coloring', price: 150, duration: 120, category: 'hair' },
    { id: 3, name: 'Highlights & Lowlights', price: 120, duration: 90, category: 'hair' },
    { id: 4, name: 'Hair Treatment', price: 60, duration: 45, category: 'treatment' },
    { id: 5, name: 'Wedding Styling', price: 200, duration: 120, category: 'special' },
    { id: 6, name: 'Blow Dry & Style', price: 50, duration: 45, category: 'styling' },
    { id: 7, name: 'Hair Extensions', price: 300, duration: 180, category: 'hair' },
    { id: 8, name: 'Kids Haircut', price: 40, duration: 30, category: 'hair' },
  ];

  const stylists = [
    { id: 1, name: 'Sarah Johnson', specialties: ['Hair Cutting', 'Styling', 'Color'], rating: 4.9 },
    { id: 2, name: 'Maria Garcia', specialties: ['Hair Coloring', 'Highlights', 'Balayage'], rating: 4.8 },
    { id: 3, name: 'Lisa Chen', specialties: ['Styling', 'Blow Dry', 'Special Occasions'], rating: 4.7 },
    { id: 4, name: 'Aisha Osei', specialties: ['Hair Treatments', 'Scalp Care', 'Natural Hair'], rating: 4.9 },
    { id: 5, name: 'Grace Mensah', specialties: ['Hair Cutting', 'Styling', 'Kids Hair'], rating: 4.6 },
    { id: 6, name: 'Fatima Diallo', specialties: ['Hair Coloring', 'Fashion Colors', 'Color Correction'], rating: 4.8 },
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30'
  ];

  const selectedService = watch('service');
  const selectedStylist = watch('stylist');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data) => {
    try {
      console.log('Submitting booking data:', data);
      
      // Prepare the booking data
      const bookingData = {
        serviceId: data.service,
        stylistId: data.stylist,
        appointmentDate: selectedDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        appointmentTime: selectedTime,
        customerName: data.customerName || 'Demo Customer',
        customerEmail: data.customerEmail || 'demo@ghbeautyhub.com',
        customerPhone: data.customerPhone || '',
        notes: data.notes || '',
        paymentMethod: data.paymentMethod || 'cash'
      };
      
      console.log('Formatted booking data:', bookingData);
      
      // Send to backend
      const response = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast.success('Booking submitted successfully! We will confirm your appointment shortly.');
        console.log('Booking created:', result.data);
        
        // Reset form and go back to first step
        setActiveStep(0);
        setSelectedDate(null);
        setSelectedTime(null);
        // You could also redirect to a confirmation page or dashboard
      } else {
        throw new Error(result.message || 'Failed to create booking');
      }
      
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error(error.message || 'Failed to submit booking. Please try again.');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select a Service
            </Typography>
            <Grid container spacing={2}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: selectedService === service.id ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                    onClick={() => setValue('service', service.id)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" component="h3">
                          {service.name}
                        </Typography>
                        <Chip label={`₵${service.price}`} color="primary" size="small" />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {service.duration} min
                        </Typography>
                      </Box>
                      <Chip label={service.category} variant="outlined" size="small" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {errors.service && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Please select a service
              </Alert>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Stylist & Time
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Choose Your Stylist
                </Typography>
                <Controller
                  name="stylist"
                  control={control}
                  rules={{ required: 'Please select a stylist' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.stylist}>
                      <InputLabel>Stylist</InputLabel>
                      <Select {...field} label="Stylist">
                        {stylists.map((stylist) => (
                          <MenuItem key={stylist.id} value={stylist.id}>
                            <Box>
                              <Typography variant="body1">{stylist.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {stylist.specialties.join(', ')} • ⭐ {stylist.rating}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Select Date
                </Typography>
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Select Time
                </Typography>
                <Grid container spacing={1}>
                  {timeSlots.map((time) => (
                    <Grid item key={time}>
                      <Button
                        variant={selectedTime === time ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => setSelectedTime(time)}
                        sx={{ minWidth: 80 }}
                      >
                        {time}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            {errors.stylist && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errors.stylist.message}
              </Alert>
            )}
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: 'First name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: 'Last name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: 'Phone number is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Special Requests or Notes"
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Any special requests, allergies, or notes for your stylist..."
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        const selectedServiceData = services.find(s => s.id === selectedService);
        const selectedStylistData = stylists.find(s => s.id === selectedStylist);
        
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review & Payment
            </Typography>
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Booking Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Service
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedServiceData?.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Stylist
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedStylistData?.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Date & Time
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedDate?.toLocaleDateString()} at {selectedTime}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {selectedServiceData?.duration} minutes
                  </Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  ₵{selectedServiceData?.price}
                </Typography>
              </Box>
            </Paper>

            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Controller
              name="paymentMethod"
              control={control}
              rules={{ required: 'Please select a payment method' }}
              render={({ field }) => (
                <FormControl component="fieldset" error={!!errors.paymentMethod}>
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="mobile_money"
                      control={<Radio />}
                      label="Mobile Money (MTN, Vodafone, AirtelTigo)"
                    />
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Credit/Debit Card"
                    />
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Pay at Salon"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
            
            {errors.paymentMethod && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errors.paymentMethod.message}
              </Alert>
            )}
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" textAlign="center" gutterBottom fontWeight="bold">
          Book Your Appointment
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          Schedule your beauty session with our expert stylists
        </Typography>

        <Card sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  endIcon={<CheckCircle />}
                >
                  Confirm Booking
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                  disabled={
                    (activeStep === 0 && !selectedService) ||
                    (activeStep === 1 && (!selectedStylist || !selectedDate || !selectedTime))
                  }
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default Booking; 
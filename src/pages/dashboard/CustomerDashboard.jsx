import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
  IconButton,
  Badge,
  Alert
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Person,
  Star,
  Add as AddIcon,
  History,
  Payment,
  Notifications,
  Edit,
  Cancel
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock data for upcoming appointments
    setUpcomingAppointments([
      {
        id: 1,
        service: 'Hair Cut & Style',
        stylist: 'Sarah Johnson',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        time: '10:00 AM',
        status: 'confirmed',
        price: 45
      },
      {
        id: 2,
        service: 'Hair Coloring',
        stylist: 'Mike Davis',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        time: '2:30 PM',
        status: 'pending',
        price: 120
      }
    ]);

    // Mock data for recent bookings
    setRecentBookings([
      {
        id: 3,
        service: 'Hair Treatment',
        stylist: 'Emma Wilson',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        time: '11:00 AM',
        status: 'completed',
        price: 85,
        rating: 5
      },
      {
        id: 4,
        service: 'Manicure',
        stylist: 'Lisa Brown',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        time: '3:00 PM',
        status: 'completed',
        price: 35,
        rating: 4
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    setUpcomingAppointments(prev => 
      prev.filter(app => app.id !== appointmentId)
    );
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Please log in to access your dashboard.</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {user.firstName}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your appointments and beauty services
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Button
                component={Link}
                to="/booking"
                variant="contained"
                startIcon={<AddIcon />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Book Appointment
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Button
                component={Link}
                to="/services"
                variant="outlined"
                startIcon={<Star />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                View Services
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Button
                component={Link}
                to="/stylists"
                variant="outlined"
                startIcon={<Person />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Our Stylists
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Notifications />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Notifications
              </Button>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Upcoming Appointments */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" component="h2">
                    Upcoming Appointments
                  </Typography>
                  <Chip 
                    label={`${upcomingAppointments.length} appointments`}
                    color="primary"
                    size="small"
                  />
                </Box>

                {upcomingAppointments.length === 0 ? (
                  <Alert severity="info">
                    No upcoming appointments. Book your next service!
                  </Alert>
                ) : (
                  <List>
                    {upcomingAppointments.map((appointment, index) => (
                      <React.Fragment key={appointment.id}>
                        <ListItem
                          sx={{
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            mb: 2,
                            bgcolor: 'background.paper'
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <CalendarToday />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  {appointment.service}
                                </Typography>
                                <Chip
                                  label={appointment.status}
                                  color={getStatusColor(appointment.status)}
                                  size="small"
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  <Person sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                  {appointment.stylist}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <CalendarToday sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                  {format(appointment.date, 'EEEE, MMMM d, yyyy')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <AccessTime sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                  {appointment.time}
                                </Typography>
                                <Typography variant="body2" fontWeight="bold" color="primary">
                                  ${appointment.price}
                                </Typography>
                              </Box>
                            }
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <IconButton
                              size="small"
                              color="primary"
                              title="Edit appointment"
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              title="Cancel appointment"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              <Cancel />
                            </IconButton>
                          </Box>
                        </ListItem>
                        {index < upcomingAppointments.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Recent Bookings */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Recent Bookings
                    </Typography>
                    <List dense>
                      {recentBookings.map((booking) => (
                        <ListItem key={booking.id} sx={{ px: 0 }}>
                          <ListItemText
                            primary={booking.service}
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {format(booking.date, 'MMM d, yyyy')} at {booking.time}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {booking.stylist}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      sx={{
                                        fontSize: 16,
                                        color: i < booking.rating ? 'warning.main' : 'grey.300'
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            }
                          />
                          <Typography variant="body2" fontWeight="bold">
                            ${booking.price}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Quick Stats */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Your Stats
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h4" color="primary" fontWeight="bold">
                            {upcomingAppointments.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Upcoming
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h4" color="success.main" fontWeight="bold">
                            {recentBookings.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Completed
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Payment History */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Recent Payments
                    </Typography>
                    <List dense>
                      {recentBookings.slice(0, 3).map((booking) => (
                        <ListItem key={booking.id} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                              <Payment sx={{ fontSize: 16 }} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`$${booking.price}`}
                            secondary={booking.service}
                          />
                          <Chip
                            label="Paid"
                            color="success"
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomerDashboard; 
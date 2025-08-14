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
  Alert,
  LinearProgress,
  Badge
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Person,
  Star,
  CheckCircle,
  Schedule,
  TrendingUp,
  Notifications,
  Edit,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';
import { format } from 'date-fns';

const StylistDashboard = () => {
  const [user, setUser] = useState(null);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [performanceStats, setPerformanceStats] = useState({});

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock data for today's appointments
    setTodayAppointments([
      {
        id: 1,
        customer: 'Jennifer Smith',
        service: 'Hair Cut & Style',
        time: '10:00 AM',
        duration: 60,
        status: 'confirmed',
        phone: '+1 (555) 123-4567',
        email: 'jennifer.smith@email.com',
        notes: 'Wants a bob cut with highlights'
      },
      {
        id: 2,
        customer: 'Maria Garcia',
        service: 'Hair Coloring',
        time: '2:30 PM',
        duration: 120,
        status: 'confirmed',
        phone: '+1 (555) 987-6543',
        email: 'maria.garcia@email.com',
        notes: 'Full color change to brunette'
      },
      {
        id: 3,
        customer: 'Sarah Johnson',
        service: 'Hair Treatment',
        time: '5:00 PM',
        duration: 90,
        status: 'pending',
        phone: '+1 (555) 456-7890',
        email: 'sarah.johnson@email.com',
        notes: 'Deep conditioning treatment'
      }
    ]);

    // Mock data for upcoming appointments
    setUpcomingAppointments([
      {
        id: 4,
        customer: 'Lisa Brown',
        service: 'Manicure & Pedicure',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        time: '11:00 AM',
        status: 'confirmed'
      },
      {
        id: 5,
        customer: 'Emma Wilson',
        service: 'Hair Extensions',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        time: '3:00 PM',
        status: 'confirmed'
      }
    ]);

    // Mock performance stats
    setPerformanceStats({
      totalAppointments: 45,
      completedThisMonth: 38,
      averageRating: 4.8,
      totalEarnings: 2850,
      customerSatisfaction: 95
    });
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

  const handleConfirmAppointment = (appointmentId) => {
    setTodayAppointments(prev =>
      prev.map(app =>
        app.id === appointmentId
          ? { ...app, status: 'confirmed' }
          : app
      )
    );
  };

  const handleCompleteAppointment = (appointmentId) => {
    setTodayAppointments(prev =>
      prev.map(app =>
        app.id === appointmentId
          ? { ...app, status: 'completed' }
          : app
      )
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
            Welcome back, {user.firstName}! 💇‍♀️
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your appointments and track your performance
          </Typography>
        </Box>

        {/* Performance Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {performanceStats.totalAppointments}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Appointments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  {performanceStats.completedThisMonth}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This Month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Star sx={{ color: 'warning.main', mr: 0.5 }} />
                  <Typography variant="h4" color="warning.main" fontWeight="bold">
                    {performanceStats.averageRating}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  ${performanceStats.totalEarnings}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Earnings
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Today's Appointments */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" component="h2">
                    Today's Appointments
                  </Typography>
                  <Chip 
                    label={`${todayAppointments.length} appointments`}
                    color="primary"
                    size="small"
                  />
                </Box>

                {todayAppointments.length === 0 ? (
                  <Alert severity="info">
                    No appointments scheduled for today. Enjoy your day off!
                  </Alert>
                ) : (
                  <List>
                    {todayAppointments.map((appointment, index) => (
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
                              <Person />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  {appointment.customer}
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
                                  <CalendarToday sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                  {appointment.service}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <AccessTime sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                  {appointment.time} ({appointment.duration} min)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <Phone sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                  {appointment.phone}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <Email sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                  {appointment.email}
                                </Typography>
                                {appointment.notes && (
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                                    Notes: {appointment.notes}
                                  </Typography>
                                )}
                              </Box>
                            }
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {appointment.status === 'pending' && (
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircle />}
                                onClick={() => handleConfirmAppointment(appointment.id)}
                              >
                                Confirm
                              </Button>
                            )}
                            {appointment.status === 'confirmed' && (
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                startIcon={<CheckCircle />}
                                onClick={() => handleCompleteAppointment(appointment.id)}
                              >
                                Complete
                              </Button>
                            )}
                            <IconButton
                              size="small"
                              color="primary"
                              title="Edit appointment"
                            >
                              <Edit />
                            </IconButton>
                          </Box>
                        </ListItem>
                        {index < todayAppointments.length - 1 && <Divider />}
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
              {/* Upcoming Schedule */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Upcoming Schedule
                    </Typography>
                    <List dense>
                      {upcomingAppointments.map((appointment) => (
                        <ListItem key={appointment.id} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                              <Schedule sx={{ fontSize: 16 }} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={appointment.customer}
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {appointment.service}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {format(appointment.date, 'MMM d, yyyy')} at {appointment.time}
                                </Typography>
                              </Box>
                            }
                          />
                          <Chip
                            label={appointment.status}
                            color={getStatusColor(appointment.status)}
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Customer Satisfaction */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Customer Satisfaction
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h4" color="success.main" fontWeight="bold" sx={{ mr: 1 }}>
                        {performanceStats.customerSatisfaction}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        satisfaction rate
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={performanceStats.customerSatisfaction}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Quick Actions */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Quick Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Schedule />}
                        fullWidth
                      >
                        View Full Schedule
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<TrendingUp />}
                        fullWidth
                      >
                        Performance Report
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Notifications />}
                        fullWidth
                      >
                        Notifications
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Working Hours */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Working Hours
                    </Typography>
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary="Monday - Friday"
                          secondary="9:00 AM - 7:00 PM"
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary="Saturday"
                          secondary="9:00 AM - 6:00 PM"
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary="Sunday"
                          secondary="10:00 AM - 4:00 PM"
                        />
                      </ListItem>
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

export default StylistDashboard; 
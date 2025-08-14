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
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  Schedule,
  Notifications,
  Settings,
  Add as AddIcon,
  Edit,
  Delete,
  Visibility,
  Star,
  CalendarToday,
  AccessTime,
  Person,
  Business,
  Assessment
} from '@mui/icons-material';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [businessStats, setBusinessStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock business statistics
    setBusinessStats({
      totalRevenue: 15420,
      monthlyRevenue: 3850,
      totalCustomers: 245,
      activeStylists: 8,
      totalAppointments: 156,
      pendingAppointments: 12,
      averageRating: 4.7,
      customerSatisfaction: 92
    });

    // Mock recent bookings
    setRecentBookings([
      {
        id: 1,
        customer: 'Jennifer Smith',
        service: 'Hair Cut & Style',
        stylist: 'Sarah Johnson',
        date: new Date(),
        time: '10:00 AM',
        amount: 45,
        status: 'completed'
      },
      {
        id: 2,
        customer: 'Maria Garcia',
        service: 'Hair Coloring',
        stylist: 'Mike Davis',
        date: new Date(),
        time: '2:30 PM',
        amount: 120,
        status: 'confirmed'
      },
      {
        id: 3,
        customer: 'Lisa Brown',
        service: 'Manicure & Pedicure',
        stylist: 'Emma Wilson',
        date: new Date(),
        time: '4:00 PM',
        amount: 65,
        status: 'pending'
      }
    ]);

    // Mock staff members
    setStaffMembers([
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Senior Stylist',
        email: 'sarah.johnson@ghbeautyhub.com',
        phone: '+1 (555) 123-4567',
        rating: 4.9,
        appointments: 45,
        status: 'active'
      },
      {
        id: 2,
        name: 'Mike Davis',
        role: 'Color Specialist',
        email: 'mike.davis@ghbeautyhub.com',
        phone: '+1 (555) 234-5678',
        rating: 4.7,
        appointments: 38,
        status: 'active'
      },
      {
        id: 3,
        name: 'Emma Wilson',
        role: 'Nail Technician',
        email: 'emma.wilson@ghbeautyhub.com',
        phone: '+1 (555) 345-6789',
        rating: 4.8,
        appointments: 42,
        status: 'active'
      }
    ]);

    // Mock pending approvals
    setPendingApprovals([
      {
        id: 1,
        type: 'appointment',
        customer: 'New Customer',
        service: 'Hair Treatment',
        amount: 85,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      {
        id: 2,
        type: 'payment',
        customer: 'Regular Customer',
        service: 'Hair Extensions',
        amount: 250,
        date: new Date()
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'confirmed':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleApproveItem = (itemId) => {
    setPendingApprovals(prev => 
      prev.filter(item => item.id !== itemId)
    );
  };

  const handleRejectItem = (itemId) => {
    setPendingApprovals(prev => 
      prev.filter(item => item.id !== itemId)
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
            Welcome back, {user.firstName}! 👑
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your salon operations and monitor business performance
          </Typography>
        </Box>

        {/* Business Overview Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <AttachMoney sx={{ color: 'success.main', mr: 0.5 }} />
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    ${businessStats.totalRevenue}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Revenue
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <People sx={{ color: 'primary.main', mr: 0.5 }} />
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    {businessStats.totalCustomers}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Customers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Schedule sx={{ color: 'warning.main', mr: 0.5 }} />
                  <Typography variant="h4" color="warning.main" fontWeight="bold">
                    {businessStats.totalAppointments}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Appointments
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
                    {businessStats.averageRating}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Recent Bookings */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" component="h2">
                    Recent Bookings
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    size="small"
                  >
                    View All
                  </Button>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Stylist</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {booking.customer}
                            </Typography>
                          </TableCell>
                          <TableCell>{booking.service}</TableCell>
                          <TableCell>{booking.stylist}</TableCell>
                          <TableCell>
                            {format(booking.date, 'MMM d')} at {booking.time}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold" color="success.main">
                              ${booking.amount}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={booking.status}
                              color={getStatusColor(booking.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" color="primary">
                              <Visibility />
                            </IconButton>
                            <IconButton size="small" color="primary">
                              <Edit />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Pending Approvals */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Pending Approvals
                    </Typography>
                    <List dense>
                      {pendingApprovals.map((item) => (
                        <ListItem key={item.id} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>
                              <Notifications sx={{ fontSize: 16 }} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${item.customer} - ${item.service}`}
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  ${item.amount} • {item.type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {format(item.date, 'MMM d, yyyy')}
                                </Typography>
                              </Box>
                            }
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() => handleApproveItem(item.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => handleRejectItem(item.id)}
                            >
                              Reject
                            </Button>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Staff Performance */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Staff Performance
                    </Typography>
                    <List dense>
                      {staffMembers.map((staff) => (
                        <ListItem key={staff.id} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <Person />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={staff.name}
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {staff.role}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  <Star sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {staff.rating} • {staff.appointments} appointments
                                  </Typography>
                                </Box>
                              </Box>
                            }
                          />
                          <Chip
                            label={staff.status}
                            color="success"
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
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
                        startIcon={<AddIcon />}
                        fullWidth
                      >
                        Add New Service
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<People />}
                        fullWidth
                      >
                        Manage Staff
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Assessment />}
                        fullWidth
                      >
                        View Reports
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Settings />}
                        fullWidth
                      >
                        System Settings
                      </Button>
                    </Box>
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
                        {businessStats.customerSatisfaction}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        satisfaction rate
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={businessStats.customerSatisfaction}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
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

export default AdminDashboard; 
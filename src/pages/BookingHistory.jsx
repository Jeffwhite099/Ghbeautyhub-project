import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
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
  Alert,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Person,
  Star,
  History,
  Payment,
  Edit,
  Visibility
} from '@mui/icons-material';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const BookingHistory = () => {
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock booking history data
    setBookingHistory([
      {
        id: 1,
        service: 'Hair Cut & Style',
        stylist: 'Sarah Johnson',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        time: '10:00 AM',
        duration: 60,
        amount: 45,
        status: 'completed',
        rating: 5,
        review: 'Amazing service! Sarah did exactly what I wanted.',
        paymentStatus: 'paid'
      },
      {
        id: 2,
        service: 'Hair Coloring',
        stylist: 'Mike Davis',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
        time: '2:30 PM',
        duration: 120,
        amount: 120,
        status: 'completed',
        rating: 4,
        review: 'Great color job, very professional.',
        paymentStatus: 'paid'
      },
      {
        id: 3,
        service: 'Hair Treatment',
        stylist: 'Emma Wilson',
        date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 3 weeks ago
        time: '11:00 AM',
        duration: 90,
        amount: 85,
        status: 'completed',
        rating: null,
        review: null,
        paymentStatus: 'paid'
      },
      {
        id: 4,
        service: 'Manicure & Pedicure',
        stylist: 'Lisa Brown',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
        time: '3:00 PM',
        duration: 90,
        amount: 65,
        status: 'completed',
        rating: 5,
        review: 'Perfect manicure, love the color!',
        paymentStatus: 'paid'
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

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleLeaveReview = (booking) => {
    setSelectedBooking(booking);
    setReviewRating(0);
    setReviewComment('');
    setReviewDialog(true);
  };

  const handleSubmitReview = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update booking with review
      setBookingHistory(prev =>
        prev.map(booking =>
          booking.id === selectedBooking.id
            ? { ...booking, rating: reviewRating, review: reviewComment }
            : booking
        )
      );
      
      setReviewDialog(false);
      toast.success('Review submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit review');
    }
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Please log in to view your booking history.</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Booking History
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          View your past appointments and leave reviews
        </Typography>

        {bookingHistory.length === 0 ? (
          <Alert severity="info">
            No booking history found. Book your first appointment to get started!
          </Alert>
        ) : (
          <List>
            {bookingHistory.map((booking, index) => (
              <React.Fragment key={booking.id}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <History />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" fontWeight="bold">
                              {booking.service}
                            </Typography>
                            <Chip
                              label={booking.status}
                              color={getStatusColor(booking.status)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              <Person sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                              {booking.stylist}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <CalendarToday sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                              {format(booking.date, 'EEEE, MMMM d, yyyy')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <AccessTime sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                              {booking.time} ({booking.duration} min)
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="primary">
                              ${booking.amount}
                            </Typography>
                            
                            {booking.rating && (
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Rating value={booking.rating} readOnly size="small" />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                  {booking.rating}/5
                                </Typography>
                              </Box>
                            )}
                            
                            {booking.review && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                                "{booking.review}"
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Visibility />}
                          onClick={() => handleViewDetails(booking)}
                        >
                          Details
                        </Button>
                        {!booking.rating && (
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<Star />}
                            onClick={() => handleLeaveReview(booking)}
                          >
                            Review
                          </Button>
                        )}
                      </Box>
                    </ListItem>
                  </CardContent>
                </Card>
                {index < bookingHistory.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}

        {/* Review Dialog */}
        <Dialog open={reviewDialog} onClose={() => setReviewDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {selectedBooking?.service}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stylist: {selectedBooking?.stylist}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {selectedBooking && format(selectedBooking.date, 'MMMM d, yyyy')}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Rate your experience:
              </Typography>
              <Rating
                value={reviewRating}
                onChange={(event, newValue) => setReviewRating(newValue)}
                size="large"
              />
            </Box>
            
            <TextField
              fullWidth
              label="Your Review (optional)"
              multiline
              rows={4}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Tell us about your experience..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReviewDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              variant="contained"
              disabled={reviewRating === 0}
            >
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default BookingHistory; 
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Rating,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Spa,
  People,
  Star,
  ArrowForward,
  AccessTime,
  LocationOn,
  Phone,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const featuredServices = [
    {
      id: 1,
      title: 'Hair Styling',
      description: 'Professional hair styling for all occasions',
      price: '₵50 - ₵200',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
      icon: <Spa />,
    },
    {
      id: 2,
      title: 'Hair Coloring',
      description: 'Expert hair coloring and highlights',
      price: '₵100 - ₵500',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      icon: <Spa />,
    },
    {
      id: 3,
      title: 'Hair Treatment',
      description: 'Nourishing hair treatments and care',
      price: '₵80 - ₵300',
      image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400',
      icon: <Spa />,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      rating: 5,
      comment: 'Amazing service! The stylists are so professional and my hair always looks perfect.',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Maria Garcia',
      role: 'Wedding Client',
      rating: 5,
      comment: 'They made me look absolutely stunning on my wedding day. Highly recommended!',
      avatar: 'MG',
    },
    {
      id: 3,
      name: 'Lisa Chen',
      role: 'Business Professional',
      rating: 5,
      comment: 'Perfect for my professional look. The team is friendly and very skilled.',
      avatar: 'LC',
    },
  ];

  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '50+', label: 'Expert Stylists' },
    { number: '10+', label: 'Years Experience' },
    { number: '100%', label: 'Satisfaction Rate' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Welcome to GH Beauty Hub
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ mb: 3, opacity: 0.9 }}
              >
                Big Gurls Beauty Palour
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, fontSize: '1.1rem', opacity: 0.8 }}
              >
                Experience the ultimate in beauty and wellness. Our expert stylists 
                are here to make you look and feel your absolute best.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/booking"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'grey.100',
                    },
                  }}
                >
                  Book Appointment
                </Button>
                <Button
                  component={Link}
                  to="/services"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  View Services
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600"
                  alt="Beauty Salon"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  border: '2px solid',
                  borderColor: 'primary.light',
                  borderRadius: 3,
                }}
              >
                <Typography variant="h3" color="primary" fontWeight="bold">
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Services */}
      <Box sx={{ py: 6, backgroundColor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Our Featured Services
          </Typography>
          <Grid container spacing={4}>
            {featuredServices.map((service) => (
              <Grid item xs={12} md={4} key={service.id}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          color: 'primary.main',
                          mr: 1,
                        }}
                      >
                        {service.icon}
                      </Box>
                      <Typography variant="h6" component="h3">
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {service.description}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
                      {service.price}
                    </Typography>
                    <Button
                      component={Link}
                      to="/services"
                      variant="outlined"
                      color="primary"
                      endIcon={<ArrowForward />}
                      fullWidth
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          What Our Clients Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Card sx={{ height: '100%', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={testimonial.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({testimonial.rating}/5)
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                  "{testimonial.comment}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Info */}
      <Box sx={{ py: 6, backgroundColor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Ready to Transform Your Look?
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Book your appointment today and experience the difference that 
                professional beauty services can make.
              </Typography>
              <Button
                component={Link}
                to="/booking"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                Book Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 2, fontSize: 24 }} />
                  <Typography variant="body1">
                    123 Beauty Street, Accra, Ghana
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 2, fontSize: 24 }} />
                  <Typography variant="body1">
                    +233 20 123 4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 2, fontSize: 24 }} />
                  <Typography variant="body1">
                    Mon-Fri: 9AM-8PM | Sat: 9AM-6PM | Sun: 10AM-4PM
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 
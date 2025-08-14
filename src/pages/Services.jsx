import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Rating,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Spa,
  AccessTime,
  Star,
  CheckCircle,
  BookOnline,
  Close,
  Person,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const categories = [
    { label: 'All Services', value: 'all' },
    { label: 'Hair Services', value: 'hair' },
    { label: 'Styling', value: 'styling' },
    { label: 'Treatments', value: 'treatments' },
    { label: 'Special Occasions', value: 'special' },
  ];

  const services = [
    {
      id: 1,
      name: 'Hair Cut & Style',
      category: 'hair',
      description: 'Professional haircut and styling for any occasion',
      longDescription: 'Our expert stylists will give you the perfect cut and style that suits your face shape and lifestyle. Includes consultation, wash, cut, and professional styling.',
      price: 80,
      duration: '60 min',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
      features: [
        'Professional consultation',
        'Hair wash and conditioning',
        'Precision cutting',
        'Professional styling',
        'Style recommendations'
      ],
      rating: 4.8,
      reviews: 127,
      stylists: ['Sarah Johnson', 'Maria Garcia', 'Lisa Chen']
    },
    {
      id: 2,
      name: 'Hair Coloring',
      category: 'hair',
      description: 'Full hair coloring with premium products',
      longDescription: 'Transform your look with our professional hair coloring services. We use only the highest quality products to ensure vibrant, long-lasting color.',
      price: 150,
      duration: '120 min',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      features: [
        'Color consultation',
        'Premium hair color',
        'Root touch-up',
        'Color protection treatment',
        'Style recommendations'
      ],
      rating: 4.9,
      reviews: 89,
      stylists: ['Sarah Johnson', 'Maria Garcia']
    },
    {
      id: 3,
      name: 'Highlights & Lowlights',
      category: 'hair',
      description: 'Beautiful highlights and lowlights for dimension',
      longDescription: 'Add depth and dimension to your hair with our expert highlighting and lowlighting services. Perfect for creating natural-looking color variations.',
      price: 120,
      duration: '90 min',
      image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400',
      features: [
        'Color consultation',
        'Foil highlights/lowlights',
        'Professional application',
        'Color protection treatment',
        'Style recommendations'
      ],
      rating: 4.7,
      reviews: 156,
      stylists: ['Sarah Johnson', 'Lisa Chen']
    },
    {
      id: 4,
      name: 'Hair Treatment',
      category: 'treatments',
      description: 'Nourishing hair treatments for healthy hair',
      longDescription: 'Restore and maintain the health of your hair with our specialized treatments. Perfect for damaged, dry, or color-treated hair.',
      price: 60,
      duration: '45 min',
      image: 'https://images.unsplash.com/photo-1552642084-9a8f8c5c9c5c?w=400',
      features: [
        'Hair analysis',
        'Deep conditioning',
        'Scalp treatment',
        'Moisture restoration',
        'Protection treatment'
      ],
      rating: 4.6,
      reviews: 203,
      stylists: ['Maria Garcia', 'Lisa Chen']
    },
    {
      id: 5,
      name: 'Wedding Styling',
      category: 'special',
      description: 'Special styling for your big day',
      longDescription: 'Make your wedding day perfect with our specialized wedding styling services. Includes trial session and day-of styling.',
      price: 200,
      duration: '120 min',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      features: [
        'Wedding consultation',
        'Trial session',
        'Day-of styling',
        'Accessories included',
        'Touch-up kit'
      ],
      rating: 5.0,
      reviews: 67,
      stylists: ['Sarah Johnson', 'Maria Garcia']
    },
    {
      id: 6,
      name: 'Blow Dry & Style',
      category: 'styling',
      description: 'Professional blow dry and styling',
      longDescription: 'Get a salon-quality blow dry and style that will last all day. Perfect for special occasions or just feeling fabulous.',
      price: 50,
      duration: '45 min',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
      features: [
        'Hair wash',
        'Professional blow dry',
        'Heat protection',
        'Style finishing',
        'Style recommendations'
      ],
      rating: 4.5,
      reviews: 234,
      stylists: ['Lisa Chen', 'Sarah Johnson']
    },
    {
      id: 7,
      name: 'Hair Extensions',
      category: 'hair',
      description: 'Professional hair extensions application',
      longDescription: 'Add length and volume to your hair with our professional hair extensions. We offer various application methods to suit your needs.',
      price: 300,
      duration: '180 min',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      features: [
        'Extension consultation',
        'Professional application',
        'Quality extensions',
        'Style and blend',
        'Maintenance instructions'
      ],
      rating: 4.8,
      reviews: 45,
      stylists: ['Sarah Johnson']
    },
    {
      id: 8,
      name: 'Kids Haircut',
      category: 'hair',
      description: 'Gentle haircuts for children',
      longDescription: 'Make haircuts fun for your little ones with our gentle and patient approach. We create a comfortable environment for children.',
      price: 40,
      duration: '30 min',
      image: 'https://images.unsplash.com/photo-1552642084-9a8f8c5c9c5c?w=400',
      features: [
        'Child-friendly environment',
        'Gentle approach',
        'Fun styling options',
        'Parent consultation',
        'Small reward included'
      ],
      rating: 4.9,
      reviews: 178,
      stylists: ['Lisa Chen', 'Maria Garcia']
    }
  ];

  const filteredServices = selectedCategory === 0 
    ? services 
    : services.filter(service => service.category === categories[selectedCategory].value);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedService(null);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Our Services
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Discover our comprehensive range of beauty services
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ mb: 6 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 120,
                fontWeight: 600,
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category.label} />
            ))}
          </Tabs>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {filteredServices.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={service.image}
                  alt={service.name}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" fontWeight="bold">
                      {service.name}
                    </Typography>
                    <Chip
                      label={`₵${service.price}`}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {service.duration}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Rating value={service.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({service.reviews} reviews)
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleServiceClick(service)}
                    startIcon={<BookOnline />}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Service Details Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedService && (
            <>
              <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedService.name}
                  </Typography>
                  <IconButton onClick={handleCloseDialog}>
                    <Close />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      component="img"
                      src={selectedService.image}
                      alt={selectedService.name}
                      sx={{
                        width: '100%',
                        height: 300,
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {selectedService.longDescription}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mr: 2 }}>
                        ₵{selectedService.price}
                      </Typography>
                      <Chip
                        label={selectedService.duration}
                        variant="outlined"
                        size="small"
                        icon={<AccessTime />}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Rating value={selectedService.rating} readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {selectedService.rating} ({selectedService.reviews} reviews)
                      </Typography>
                    </Box>

                    <Typography variant="h6" gutterBottom>
                      What's Included:
                    </Typography>
                    <List dense>
                      {selectedService.features.map((feature, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom>
                      Available Stylists:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {selectedService.stylists.map((stylist, index) => (
                        <Chip
                          key={index}
                          label={stylist}
                          icon={<Person />}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleCloseDialog} variant="outlined">
                  Cancel
                </Button>
                <Button
                  component={Link}
                  to="/booking"
                  variant="contained"
                  color="primary"
                  startIcon={<BookOnline />}
                  onClick={handleCloseDialog}
                >
                  Book This Service
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Services; 
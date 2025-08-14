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
  Rating,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Person,
  Star,
  AccessTime,
  CheckCircle,
  BookOnline,
  Close,
  Spa,
  Work,
  School,
  Instagram,
  Facebook,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Stylists = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const categories = [
    { label: 'All Stylists', value: 'all' },
    { label: 'Hair Specialists', value: 'hair' },
    { label: 'Color Experts', value: 'color' },
    { label: 'Styling Specialists', value: 'styling' },
    { label: 'Treatment Experts', value: 'treatment' },
  ];

  const stylists = [
    {
      id: 1,
      name: 'Sarah Johnson',
      category: 'hair',
      specialties: ['Hair Cutting', 'Styling', 'Color'],
      experience: '8 years',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
      bio: 'Sarah is our lead stylist with over 8 years of experience in the beauty industry. She specializes in modern cuts, color techniques, and creating personalized looks for every client.',
      education: 'Beauty Academy of Ghana, Advanced Hair Styling Certification',
      certifications: ['Professional Hair Styling', 'Advanced Color Techniques', 'Hair Extensions'],
      services: ['Hair Cut & Style', 'Hair Coloring', 'Highlights & Lowlights', 'Hair Extensions'],
      availability: 'Mon-Fri: 9AM-6PM, Sat: 9AM-4PM',
      social: {
        instagram: '@sarahjohnson_beauty',
        facebook: 'Sarah Johnson Beauty'
      }
    },
    {
      id: 2,
      name: 'Maria Garcia',
      category: 'color',
      specialties: ['Hair Coloring', 'Highlights', 'Balayage'],
      experience: '6 years',
      rating: 4.8,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      bio: 'Maria is our color specialist with a passion for creating beautiful, natural-looking color transformations. She excels in balayage, highlights, and custom color formulations.',
      education: 'International Beauty Institute, Color Specialist Program',
      certifications: ['Advanced Color Techniques', 'Balayage Specialist', 'Color Correction'],
      services: ['Hair Coloring', 'Highlights & Lowlights', 'Hair Treatment', 'Wedding Styling'],
      availability: 'Mon-Fri: 10AM-7PM, Sat: 9AM-5PM',
      social: {
        instagram: '@mariagarcia_colors',
        facebook: 'Maria Garcia Hair Color'
      }
    },
    {
      id: 3,
      name: 'Lisa Chen',
      category: 'styling',
      specialties: ['Styling', 'Blow Dry', 'Special Occasions'],
      experience: '5 years',
      rating: 4.7,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Lisa specializes in creating stunning styles for special occasions. Her attention to detail and creative flair make her the go-to stylist for weddings and events.',
      education: 'Fashion Institute of Beauty, Styling & Design',
      certifications: ['Advanced Styling Techniques', 'Wedding Hair Specialist', 'Updo Master'],
      services: ['Blow Dry & Style', 'Wedding Styling', 'Kids Haircut', 'Hair Cut & Style'],
      availability: 'Mon-Fri: 9AM-6PM, Sun: 10AM-4PM',
      social: {
        instagram: '@lisachen_styles',
        facebook: 'Lisa Chen Styling'
      }
    },
    {
      id: 4,
      name: 'Aisha Osei',
      category: 'treatment',
      specialties: ['Hair Treatments', 'Scalp Care', 'Natural Hair'],
      experience: '7 years',
      rating: 4.9,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      bio: 'Aisha is our hair treatment expert with extensive knowledge in natural hair care and scalp treatments. She helps clients achieve healthy, beautiful hair through proper care.',
      education: 'Natural Hair Care Institute, Advanced Treatment Certification',
      certifications: ['Natural Hair Specialist', 'Scalp Treatment Expert', 'Hair Care Consultant'],
      services: ['Hair Treatment', 'Natural Hair Care', 'Scalp Treatments', 'Hair Cut & Style'],
      availability: 'Mon-Fri: 10AM-7PM, Sat: 9AM-5PM',
      social: {
        instagram: '@aishaosei_natural',
        facebook: 'Aisha Osei Natural Hair'
      }
    },
    {
      id: 5,
      name: 'Grace Mensah',
      category: 'hair',
      specialties: ['Hair Cutting', 'Styling', 'Kids Hair'],
      experience: '4 years',
      rating: 4.6,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      bio: 'Grace is our family-friendly stylist who specializes in cuts for all ages. She has a gentle approach and makes everyone feel comfortable in the salon.',
      education: 'Beauty School of Ghana, Family Hair Styling',
      certifications: ['Family Hair Styling', 'Kids Hair Specialist', 'Gentle Cutting Techniques'],
      services: ['Hair Cut & Style', 'Kids Haircut', 'Blow Dry & Style', 'Hair Treatment'],
      availability: 'Mon-Fri: 9AM-6PM, Sat: 9AM-4PM',
      social: {
        instagram: '@gracemensah_family',
        facebook: 'Grace Mensah Family Hair'
      }
    },
    {
      id: 6,
      name: 'Fatima Diallo',
      category: 'color',
      specialties: ['Hair Coloring', 'Fashion Colors', 'Color Correction'],
      experience: '5 years',
      rating: 4.8,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      bio: 'Fatima is our fashion color specialist who loves creating bold, vibrant looks. She excels in fashion colors, color correction, and creating unique color combinations.',
      education: 'International Color Academy, Fashion Color Specialist',
      certifications: ['Fashion Color Specialist', 'Color Correction Expert', 'Creative Color Techniques'],
      services: ['Hair Coloring', 'Fashion Colors', 'Color Correction', 'Highlights & Lowlights'],
      availability: 'Mon-Fri: 10AM-7PM, Sat: 9AM-5PM',
      social: {
        instagram: '@fatimadiallo_colors',
        facebook: 'Fatima Diallo Fashion Colors'
      }
    }
  ];

  const filteredStylists = selectedCategory === 0 
    ? stylists 
    : stylists.filter(stylist => stylist.category === categories[selectedCategory].value);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleStylistClick = (stylist) => {
    setSelectedStylist(stylist);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStylist(null);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Meet Our Stylists
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Our expert team of professional stylists is here to make you look and feel beautiful
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

        {/* Stylists Grid */}
        <Grid container spacing={4}>
          {filteredStylists.map((stylist) => (
            <Grid item xs={12} sm={6} md={4} key={stylist.id}>
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
                  height="250"
                  image={stylist.image}
                  alt={stylist.name}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                    {stylist.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={stylist.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({stylist.reviews} reviews)
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Work sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {stylist.experience} experience
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    {stylist.specialties.map((specialty, index) => (
                      <Chip
                        key={index}
                        label={specialty}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {stylist.bio.substring(0, 100)}...
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleStylistClick(stylist)}
                    startIcon={<BookOnline />}
                  >
                    Book with {stylist.name.split(' ')[0]}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stylist Details Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedStylist && (
            <>
              <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedStylist.name}
                  </Typography>
                  <IconButton onClick={handleCloseDialog}>
                    <Close />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box
                      component="img"
                      src={selectedStylist.image}
                      alt={selectedStylist.name}
                      sx={{
                        width: '100%',
                        height: 300,
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                        <Rating value={selectedStylist.rating} readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {selectedStylist.rating} ({selectedStylist.reviews} reviews)
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <Instagram />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Facebook />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {selectedStylist.bio}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Work sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        <strong>Experience:</strong> {selectedStylist.experience}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <School sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        <strong>Education:</strong> {selectedStylist.education}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        <strong>Availability:</strong> {selectedStylist.availability}
                      </Typography>
                    </Box>

                    <Typography variant="h6" gutterBottom>
                      Specialties:
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      {selectedStylist.specialties.map((specialty, index) => (
                        <Chip
                          key={index}
                          label={specialty}
                          icon={<Spa />}
                          color="primary"
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>

                    <Typography variant="h6" gutterBottom>
                      Certifications:
                    </Typography>
                    <List dense>
                      {selectedStylist.certifications.map((cert, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={cert} />
                        </ListItem>
                      ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom>
                      Services Offered:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {selectedStylist.services.map((service, index) => (
                        <Chip
                          key={index}
                          label={service}
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
                >
                  Book Appointment
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Stylists; 
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Email,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Salon Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              GH Beauty Hub
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Big Gurls Beauty Palour
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your premier destination for beauty and wellness. We specialize in 
              creating stunning looks that make you feel confident and beautiful.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                color="inherit"
                size="small"
                component={Link}
                href="https://facebook.com"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                component={Link}
                href="https://instagram.com"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                component={Link}
                href="https://twitter.com"
                target="_blank"
              >
                <Twitter />
              </IconButton>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                123 Beauty Street, Accra, Ghana
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                +233 20 123 4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                info@ghbeautyhub.com
              </Typography>
            </Box>
          </Grid>

          {/* Business Hours */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Business Hours
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessTime sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                Monday - Friday: 9:00 AM - 8:00 PM
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 3, mb: 1 }}>
              Saturday: 9:00 AM - 6:00 PM
            </Typography>
            <Typography variant="body2" sx={{ ml: 3, mb: 1 }}>
              Sunday: 10:00 AM - 4:00 PM
            </Typography>
            <Typography variant="body2" sx={{ ml: 3, mb: 2 }}>
              (Closed on Public Holidays)
            </Typography>
            
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link href="/services" color="inherit" underline="hover">
                Our Services
              </Link>
              <Link href="/stylists" color="inherit" underline="hover">
                Meet Our Stylists
              </Link>
              <Link href="/booking" color="inherit" underline="hover">
                Book Appointment
              </Link>
              <Link href="/login" color="inherit" underline="hover">
                Customer Login
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2">
            © {currentYear} GH Beauty Hub. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/privacy" color="inherit" underline="hover" variant="body2">
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover" variant="body2">
              Terms of Service
            </Link>
            <Link href="/cancellation" color="inherit" underline="hover" variant="body2">
              Cancellation Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 
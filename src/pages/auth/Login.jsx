import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Facebook,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log('🚀 Login form submitted with:', data);
      
      const { user } = await signIn(data.email, data.password);
      console.log('👤 User returned from signIn:', user);
      
      if (user) {
        toast.success('Login successful!');
        
        // Navigate based on user role (default to customer if no role)
        const role = user.role || 'customer';
        console.log('🎭 User role determined:', role);
        
        if (role === 'admin') {
          console.log('🔄 Navigating to admin dashboard...');
          navigate('/dashboard/admin');
        } else if (role === 'stylist') {
          console.log('🔄 Navigating to stylist dashboard...');
          navigate('/dashboard/stylist');
        } else {
          console.log('🔄 Navigating to customer dashboard...');
          navigate('/dashboard/customer');
        }
      } else {
        console.log('❌ No user returned from signIn');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      const errorMessage = error.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Google login functionality coming soon!');
  };

  const handleFacebookLogin = () => {
    toast.info('Facebook login functionality coming soon!');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to your GH Beauty Hub account
              </Typography>
            </Box>

            {/* Demo Credentials Alert */}
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
              { /* <strong>Demo Credentials:</strong><br />
                • Admin: admin@ghbeautyhub.com / admin123<br />
                • Stylist: stylist@ghbeautyhub.com / stylist123<br />
                • Customer: customer@ghbeautyhub.com / customer123 */}
              </Typography>
            </Alert>

            {/* Social Login Buttons */}
            <Box sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={handleGoogleLogin}
                sx={{ mb: 2 }}
              >
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={handleFacebookLogin}
              >
                Continue with Facebook
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email Address"
                    type="email"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 3 }}>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  color="primary"
                  sx={{ textDecoration: 'none' }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mb: 3 }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  color="primary"
                  sx={{ textDecoration: 'none', fontWeight: 600 }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>

            {/* Back to Home */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link
                component={RouterLink}
                to="/"
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'none' }}
              >
                ← Back to Home
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login; 
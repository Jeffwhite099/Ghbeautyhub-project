import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ 
  variant = 'default', // 'default', 'hero', 'favicon'
  size = 'medium', // 'small', 'medium', 'large'
  showText = true,
  className = '',
  ...props 
}) => {
  const getLogoSrc = () => {
    switch (variant) {
      case 'hero':
        return '/hero-logo.svg';
      case 'favicon':
        return '/favicon.svg';
      case 'icon':
        return '/logo-icon.svg';
      default:
        return '/logo.svg';
    }
  };

  const getLogoSize = () => {
    switch (size) {
      case 'small':
        return { height: '30px', width: 'auto' };
      case 'large':
        return { height: '60px', width: 'auto' };
      default:
        return { height: '40px', width: 'auto' };
    }
  };

  const getHeroSize = () => {
    switch (size) {
      case 'small':
        return { maxWidth: '200px', height: 'auto' };
      case 'large':
        return { maxWidth: '100%', height: 'auto', maxHeight: '200px' };
      default:
        return { maxWidth: '100%', height: 'auto', maxHeight: '150px' };
    }
  };

  if (variant === 'hero') {
    return (
      <Box className={className} {...props}>
        <img 
          src={getLogoSrc()} 
          alt="GH Beauty Hub Hero Logo" 
          style={getHeroSize()}
        />
      </Box>
    );
  }

  return (
    <Box className={className} {...props}>
      <img 
        src={getLogoSrc()} 
        alt="GH Beauty Hub Logo" 
        style={getLogoSize()}
      />
    </Box>
  );
};

export default Logo;

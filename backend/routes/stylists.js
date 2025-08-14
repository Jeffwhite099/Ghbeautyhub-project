const express = require('express');
const User = require('../models/User');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all stylists
// @route   GET /api/stylists
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const stylists = await User.find({ 
      role: 'stylist', 
      isActive: true 
    }).select('-password');
    
    res.json({
      success: true,
      count: stylists.length,
      data: stylists
    });
  } catch (error) {
    console.error('Get stylists error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 
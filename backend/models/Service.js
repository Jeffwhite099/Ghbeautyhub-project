const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  longDescription: {
    type: String,
    maxlength: [1000, 'Long description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['hair', 'styling', 'treatments', 'special', 'makeup', 'nails', 'spa']
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Service duration is required'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  image: {
    type: String,
    default: ''
  },
  features: [{
    type: String,
    maxlength: [100, 'Feature description cannot exceed 100 characters']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  stylists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  requirements: [{
    type: String,
    maxlength: [100, 'Requirement description cannot exceed 100 characters']
  }],
  cancellationPolicy: {
    type: String,
    default: '24 hours notice required for cancellation'
  },
  maxBookingsPerDay: {
    type: Number,
    default: 10
  },
  currentBookingsToday: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ isPopular: 1, isActive: 1 });

module.exports = mongoose.model('Service', serviceSchema); 
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Customer is required']
  },
  stylist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Stylist is required']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'mobile_money', 'card', 'bank_transfer'],
    default: 'cash'
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  cancellationReason: {
    type: String,
    maxlength: [500, 'Cancellation reason cannot exceed 500 characters']
  },
  cancelledBy: {
    type: String,
    enum: ['customer', 'stylist', 'admin', 'system']
  },
  cancellationDate: Date,
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderDate: Date,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  reviewDate: Date,
  // For recurring appointments
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPattern: {
    type: String,
    enum: ['weekly', 'bi-weekly', 'monthly']
  },
  parentBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ customer: 1, appointmentDate: 1 });
bookingSchema.index({ stylist: 1, appointmentDate: 1 });
bookingSchema.index({ status: 1, appointmentDate: 1 });
bookingSchema.index({ appointmentDate: 1, appointmentTime: 1 });

// Virtual for checking if booking is in the past
bookingSchema.virtual('isPast').get(function() {
  const now = new Date();
  const appointmentDateTime = new Date(this.appointmentDate);
  appointmentDateTime.setHours(
    parseInt(this.appointmentTime.split(':')[0]),
    parseInt(this.appointmentTime.split(':')[1])
  );
  return appointmentDateTime < now;
});

// Virtual for checking if booking is today
bookingSchema.virtual('isToday').get(function() {
  const today = new Date().toDateString();
  const appointmentDate = new Date(this.appointmentDate).toDateString();
  return today === appointmentDate;
});

// Ensure virtuals are included when converting to JSON
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Booking', bookingSchema); 
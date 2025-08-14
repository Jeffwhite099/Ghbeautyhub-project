const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
require('dotenv').config({ path: './config.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected for seeding'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@ghbeautyhub.com',
    password: 'admin123',
    phone: '+233201234567',
    role: 'admin',
    address: {
      street: '123 Admin Street',
      city: 'Accra',
      region: 'Greater Accra'
    }
  },
  {
    name: 'Sarah Johnson',
    email: 'stylist@ghbeautyhub.com',
    password: 'stylist123',
    phone: '+233201234568',
    role: 'stylist',
    stylistInfo: {
      specialties: ['Hair Cutting', 'Styling', 'Color'],
      experience: 5,
      bio: 'Expert hair stylist with 5 years of experience in modern and classic styles.',
      rating: 4.9,
      totalReviews: 127
    },
    address: {
      street: '456 Stylist Avenue',
      city: 'Accra',
      region: 'Greater Accra'
    }
  },
  {
    name: 'Maria Garcia',
    email: 'stylist2@ghbeautyhub.com',
    password: 'stylist123',
    phone: '+233201234569',
    role: 'stylist',
    stylistInfo: {
      specialties: ['Hair Coloring', 'Highlights', 'Balayage'],
      experience: 7,
      bio: 'Specialized in hair coloring and highlights with international training.',
      rating: 4.8,
      totalReviews: 89
    },
    address: {
      street: '789 Color Street',
      city: 'Accra',
      region: 'Greater Accra'
    }
  },
  {
    name: 'John Doe',
    email: 'customer@ghbeautyhub.com',
    password: 'customer123',
    phone: '+233201234570',
    role: 'customer',
    customerInfo: {
      preferences: ['Hair styling', 'Hair treatment'],
      loyaltyPoints: 150,
      totalSpent: 450
    },
    address: {
      street: '321 Customer Road',
      city: 'Accra',
      region: 'Greater Accra'
    }
  }
];

const sampleServices = [
  {
    name: 'Hair Cut & Style',
    description: 'Professional haircut and styling for any occasion',
    longDescription: 'Our expert stylists will give you the perfect cut and style that suits your face shape and lifestyle. Includes consultation, wash, cut, and professional styling.',
    category: 'hair',
    price: 80,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
    features: [
      'Professional consultation',
      'Hair wash and conditioning',
      'Precision cutting',
      'Professional styling',
      'Style recommendations'
    ],
    isPopular: true,
    rating: 4.8,
    totalReviews: 127
  },
  {
    name: 'Hair Coloring',
    description: 'Full hair coloring with premium products',
    longDescription: 'Transform your look with our professional hair coloring services. We use only the highest quality products to ensure vibrant, long-lasting color.',
    category: 'hair',
    price: 150,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    features: [
      'Color consultation',
      'Premium hair color',
      'Root touch-up',
      'Color protection treatment',
      'Style recommendations'
    ],
    isPopular: true,
    rating: 4.9,
    totalReviews: 89
  },
  {
    name: 'Highlights & Lowlights',
    description: 'Beautiful highlights and lowlights for dimension',
    longDescription: 'Add depth and dimension to your hair with our expert highlighting and lowlighting services. Perfect for creating natural-looking color variations.',
    category: 'hair',
    price: 120,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400',
    features: [
      'Color consultation',
      'Professional highlighting',
      'Natural-looking results',
      'Color protection',
      'Style recommendations'
    ],
    rating: 4.7,
    totalReviews: 156
  },
  {
    name: 'Hair Treatment',
    description: 'Nourishing hair treatments and care',
    longDescription: 'Give your hair the care it deserves with our professional hair treatments. From deep conditioning to protein treatments, we have solutions for all hair types.',
    category: 'treatments',
    price: 60,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1552642084-9a8f8c5c9c5c?w=400',
    features: [
      'Hair analysis',
      'Deep conditioning',
      'Scalp treatment',
      'Hair protection',
      'Aftercare advice'
    ],
    rating: 4.6,
    totalReviews: 203
  },
  {
    name: 'Wedding Styling',
    description: 'Special occasion styling for your big day',
    longDescription: 'Make your special day perfect with our wedding styling services. From elegant updos to romantic curls, we create the perfect look for your wedding.',
    category: 'special',
    price: 200,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    features: [
      'Wedding consultation',
      'Trial session',
      'Professional styling',
      'Hair accessories',
      'Touch-up kit'
    ],
    isPopular: true,
    rating: 5.0,
    totalReviews: 67
  },
  {
    name: 'Blow Dry & Style',
    description: 'Professional blow dry and styling',
    longDescription: 'Get salon-quality blow dry and styling for any occasion. Perfect for events, dates, or just to feel fabulous.',
    category: 'styling',
    price: 50,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400',
    features: [
      'Hair wash',
      'Professional blow dry',
      'Styling',
      'Heat protection',
      'Style recommendations'
    ],
    rating: 4.5,
    totalReviews: 234
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    
    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = await User.create(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Get stylist IDs for services
    const stylists = createdUsers.filter(user => user.role === 'stylist');
    
    // Add stylist IDs to services
    const servicesWithStylists = sampleServices.map(service => ({
      ...service,
      stylists: stylists.map(stylist => stylist._id)
    }));

    // Create services
    const createdServices = await Service.create(servicesWithStylists);
    console.log(`✅ Created ${createdServices.length} services`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Admin: admin@ghbeautyhub.com / admin123');
    console.log('Stylist: stylist@ghbeautyhub.com / stylist123');
    console.log('Customer: customer@ghbeautyhub.com / customer123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase(); 
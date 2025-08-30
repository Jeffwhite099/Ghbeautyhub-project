import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

async function testAPI() {
  console.log('🧪 Testing GH Beauty Hub API...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', healthResponse.data.message);
    console.log('   Status:', healthResponse.data.status);
    console.log('   Timestamp:', healthResponse.data.timestamp);
    console.log('');

    // Test 2: Get Services
    console.log('2️⃣ Testing Services API...');
    const servicesResponse = await axios.get(`${API_BASE}/services`);
    console.log('✅ Services API:', `Found ${servicesResponse.data.count} services`);
    console.log('   Services:', servicesResponse.data.data.map(s => s.name).join(', '));
    console.log('');

    // Test 3: Login Test
    console.log('3️⃣ Testing Authentication...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@ghbeautyhub.com',
      password: 'admin123'
    });
    console.log('✅ Login successful!');
    console.log('   User:', loginResponse.data.data.user.name);
    console.log('   Role:', loginResponse.data.data.user.role);
    console.log('   Token received:', loginResponse.data.data.token ? 'Yes' : 'No');
    console.log('');

    // Test 4: Get Stylists
    console.log('4️⃣ Testing Stylists API...');
    const stylistsResponse = await axios.get(`${API_BASE}/stylists`);
    console.log('✅ Stylists API:', `Found ${stylistsResponse.data.count} stylists`);
    console.log('   Stylists:', stylistsResponse.data.data.map(s => s.name).join(', '));
    console.log('');

    console.log('🎉 All API tests passed! Your backend is working perfectly!');
    console.log('\n📋 Next steps:');
    console.log('   1. Open http://localhost:5173 in your browser');
    console.log('   2. Click "Login" and use the demo credentials');
    console.log('   3. Explore the application!');

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure MongoDB is running');
    console.log('   2. Check if backend is running on port 5000');
    console.log('   3. Run "npm run seed" to populate the database');
  }
}

// Run the test
testAPI(); 
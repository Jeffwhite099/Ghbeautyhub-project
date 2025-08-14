import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import pages
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Services from './pages/Services'
import Stylists from './pages/Stylists'
import Booking from './pages/Booking'
import BookingHistory from './pages/BookingHistory'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import CustomerDashboard from './pages/dashboard/CustomerDashboard'
import StylistDashboard from './pages/dashboard/StylistDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'

// Import layout components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Import auth context
import { AuthProvider } from './contexts/AuthContext'
import { PaymentProvider } from './contexts/PaymentContext'

function App() {
  // Add debugging for routing
  console.log('App component rendered, current location:', window.location.pathname)

  return (
    <AuthProvider>
      <PaymentProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/services" element={<Services />} />
                <Route path="/stylists" element={<Stylists />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/booking-history" element={<BookingHistory />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard/customer" element={<CustomerDashboard />} />
                <Route path="/dashboard/stylist" element={<StylistDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                {/* Catch all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PaymentProvider>
    </AuthProvider>
  )
}

export default App

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend API configuration
  const API_BASE = 'http://localhost:5001/api';

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const checkExistingAuth = () => {
      const savedUser = localStorage.getItem('ghbeautyhub_user');
      const savedToken = localStorage.getItem('ghbeautyhub_token');
      
      if (savedUser && savedToken) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setProfile(userData);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('ghbeautyhub_user');
          localStorage.removeItem('ghbeautyhub_token');
        }
      }
      setLoading(false);
    };

    checkExistingAuth();
  }, []);

  const signIn = async (email, password) => {
    try {
      console.log('🔐 Attempting login with:', { email, password });
      
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('📡 Backend response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success && data.data.user) {
        const userData = {
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.name,
          role: data.data.user.role,
          token: data.data.token
        };

        console.log('✅ User data prepared:', userData);

        // Save to state and localStorage
        setUser(userData);
        setProfile(userData);
        localStorage.setItem('ghbeautyhub_user', JSON.stringify(userData));
        localStorage.setItem('ghbeautyhub_token', data.data.token);

        console.log('💾 User data saved to state and localStorage');
        return { user: userData };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };

  const signUp = async (email, password, userData) => {
    try {
      console.log('🔐 Attempting registration with:', { email, password, userData });
      
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData?.name || email.split('@')[0], // Use email prefix as name if not provided
          email,
          password,
          phone: userData?.phone || '',
          role: userData?.role || 'customer'
        }),
      });

      const data = await response.json();
      console.log('📡 Backend registration response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success && data.data.user) {
        const userData = {
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.name,
          role: data.data.user.role,
          phone: data.data.user.phone,
          token: data.data.token
        };

        console.log('✅ User registered successfully:', userData);

        // Save to state and localStorage
        setUser(userData);
        setProfile(userData);
        localStorage.setItem('ghbeautyhub_user', JSON.stringify(userData));
        localStorage.setItem('ghbeautyhub_token', data.data.token);

        console.log('💾 User data saved to state and localStorage');
        return { user: userData };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Clear state and localStorage
      setUser(null);
      setProfile(null);
      localStorage.removeItem('ghbeautyhub_user');
      localStorage.removeItem('ghbeautyhub_token');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateProfile = async (updates) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      // For now, just update local state
      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
      
      // Update localStorage
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('ghbeautyhub_user', JSON.stringify(updatedUser));
      
      return updatedProfile;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isStylist: profile?.role === 'stylist',
    isCustomer: profile?.role === 'customer' || !profile?.role,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
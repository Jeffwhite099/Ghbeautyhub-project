# 🚀 GH Beauty Hub - Supabase Backend Setup Guide

This guide will help you set up Supabase as the backend for your GH Beauty Hub application.

## 📋 Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- A Supabase account (free at [supabase.com](https://supabase.com))

## 🔧 Step 1: Create a Supabase Project

1. **Go to [supabase.com](https://supabase.com)** and sign up/login
2. **Click "New Project"**
3. **Fill in the details:**
   - Organization: Your organization
   - Project name: `ghbeautyhub`
   - Database password: Choose a strong password
   - Region: Choose closest to your users
4. **Click "Create new project"**
5. **Wait for the project to be set up** (usually takes 1-2 minutes)

## 🔑 Step 2: Get Your Supabase Credentials

1. **In your Supabase dashboard**, go to **Settings** → **API**
2. **Copy these values:**
   - Project URL (looks like: `https://your-project-id.supabase.co`)
   - Anon public key (starts with `eyJ...`)

## ⚙️ Step 3: Configure Environment Variables

1. **Create a `.env.local` file** in your project root:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **Replace the values** with your actual Supabase credentials

## 🗄️ Step 4: Set Up Database Schema

1. **In your Supabase dashboard**, go to **SQL Editor**
2. **Copy the entire content** from `supabase-schema.sql`
3. **Paste it into the SQL Editor**
4. **Click "Run"** to execute the schema

This will create:
- ✅ User profiles table
- ✅ Services table
- ✅ Stylists table
- ✅ Appointments table
- ✅ Reviews table
- ✅ Row Level Security (RLS) policies
- ✅ Sample data

## 🔐 Step 5: Configure Authentication

1. **In Supabase dashboard**, go to **Authentication** → **Settings**
2. **Configure email templates** (optional but recommended)
3. **Set up email confirmation** if needed
4. **Configure social providers** (Google, Facebook) if desired

## 🚀 Step 6: Test Your Setup

1. **Start your frontend:**
```bash
yarn dev
```

2. **Open your browser** and go to `http://localhost:5173`

3. **Test the registration:**
   - Go to `/register`
   - Create a new account
   - Check your email for confirmation (if enabled)

4. **Test the login:**
   - Go to `/login`
   - Sign in with your credentials

## 📱 Step 7: Update Your Frontend Components

Your frontend is already configured to work with Supabase! The following files have been updated:

### ✅ **Already Updated:**
- `src/lib/supabase.js` - Supabase client configuration
- `src/contexts/AuthContext.jsx` - Authentication context
- `src/pages/auth/Login.jsx` - Login component
- `src/pages/auth/Register.jsx` - Registration component
- `src/App.jsx` - App with AuthProvider

### 🔄 **Next Steps - Update These Components:**

1. **Services Page** (`src/pages/Services.jsx`)
2. **Stylists Page** (`src/pages/Stylists.jsx`)
3. **Booking Page** (`src/pages/Booking.jsx`)
4. **Dashboard Pages** (`src/pages/dashboard/`)

## 🛠️ Step 8: Update Services Page

Here's how to update your Services page to use Supabase:

```jsx
import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data, error } = await db.getServices();
        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Rest of your component...
};
```

## 🛠️ Step 9: Update Stylists Page

```jsx
import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';

const Stylists = () => {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStylists = async () => {
      try {
        const { data, error } = await db.getStylists();
        if (error) throw error;
        setStylists(data || []);
      } catch (error) {
        console.error('Error loading stylists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStylists();
  }, []);

  // Rest of your component...
};
```

## 🛠️ Step 10: Update Booking Page

```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';

const Booking = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [servicesData, stylistsData] = await Promise.all([
        db.getServices(),
        db.getStylists()
      ]);
      
      setServices(servicesData.data || []);
      setStylists(stylistsData.data || []);
    };

    loadData();
  }, []);

  const handleBooking = async (bookingData) => {
    try {
      const { data, error } = await db.createAppointment({
        ...bookingData,
        user_id: user.id
      });
      
      if (error) throw error;
      // Handle success
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  // Rest of your component...
};
```

## 🔍 Step 11: Test Database Operations

You can test your database operations in the Supabase dashboard:

1. **Go to Table Editor** in your Supabase dashboard
2. **Check each table** to see the sample data
3. **Test queries** in the SQL Editor

## 🚨 Troubleshooting

### **Common Issues:**

1. **"Invalid API key" error:**
   - Check your `.env.local` file
   - Make sure you're using the anon key, not the service role key

2. **"Table doesn't exist" error:**
   - Make sure you ran the `supabase-schema.sql` script
   - Check the SQL Editor for any errors

3. **Authentication not working:**
   - Check your Supabase project settings
   - Verify email confirmation settings

4. **CORS errors:**
   - Add your frontend URL to Supabase Auth settings
   - Go to Authentication → Settings → URL Configuration

### **Debug Commands:**

```bash
# Check if environment variables are loaded
console.log(import.meta.env.VITE_SUPABASE_URL);

# Test Supabase connection
import { supabase } from './lib/supabase';
const { data, error } = await supabase.from('services').select('*');
console.log('Services:', data, error);
```

## 📊 Database Schema Overview

### **Tables Created:**

1. **`profiles`** - User profiles with roles
2. **`services`** - Beauty services offered
3. **`stylists`** - Stylist information
4. **`appointments`** - Booking appointments
5. **`reviews`** - Customer reviews

### **Key Features:**

- ✅ **Row Level Security (RLS)** - Data protection
- ✅ **Automatic timestamps** - Created/updated tracking
- ✅ **Foreign key relationships** - Data integrity
- ✅ **Sample data** - Ready to test
- ✅ **Indexes** - Performance optimization

## 🎯 Next Steps

1. **Update remaining components** to use Supabase
2. **Add real-time features** with Supabase subscriptions
3. **Implement file uploads** for images
4. **Add email notifications** for bookings
5. **Deploy to production**

## 📞 Support

If you encounter any issues:

1. **Check the Supabase documentation**: [supabase.com/docs](https://supabase.com/docs)
2. **Review the error logs** in your browser console
3. **Check the Supabase dashboard** for database errors
4. **Verify your environment variables** are correct

---

## 🎉 Congratulations!

You've successfully set up Supabase as your backend! Your GH Beauty Hub application now has:

- ✅ **Real-time database**
- ✅ **User authentication**
- ✅ **Row-level security**
- ✅ **Scalable infrastructure**
- ✅ **Production-ready setup**

Your application is now ready for real users! 🚀 
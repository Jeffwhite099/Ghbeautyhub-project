# ⚡ Quick Start - Supabase Setup

## 🚀 Essential Steps (5 minutes)

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Click "New Project"
- Name: `ghbeautyhub`
- Wait for setup (1-2 minutes)

### 2. Get Credentials
- Settings → API
- Copy **Project URL** and **Anon Key**

### 3. Create `.env.local`
```bash

NEXT_PUBLIC_SUPABASE_URL=https://srsajofdungqowvwygbf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc2Fqb2ZkdW5ncW93dnd5Z2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MjA0NjEsImV4cCI6MjA3MDA5NjQ2MX0.vvA5ZxBQzFxK5KikxFXC_61NvSdGDh5Y3klO6Dqbv5E

```

### 4. Run Database Schema
- SQL Editor in Supabase dashboard
- Copy/paste `supabase-schema.sql`
- Click "Run"

### 5. Test Your App
```bash
yarn dev
```
- Go to `http://localhost:5173`
- Try registration/login

## 🔧 Files Already Updated
- ✅ `src/lib/supabase.js`
- ✅ `src/contexts/AuthContext.jsx`
- ✅ `src/pages/auth/Login.jsx`
- ✅ `src/pages/auth/Register.jsx`
- ✅ `src/App.jsx`

## 📋 What's Created
- **5 Tables**: profiles, services, stylists, appointments, reviews
- **Sample Data**: 9 services, 5 stylists
- **Security**: Row Level Security (RLS)
- **Auth**: Email/password + social login ready

## 🎯 Next Steps
1. Update Services page to use `db.getServices()`
2. Update Stylists page to use `db.getStylists()`
3. Update Booking page to use `db.createAppointment()`
4. Test with real users!

---
**Need help?** See `SUPABASE_SETUP.md` for detailed instructions. 
-- GH Beauty Hub - Supabase Database Schema
-- This file contains the complete database structure for the beauty salon application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types (only if they don't exist)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'stylist', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE service_category AS ENUM ('hair_styling', 'hair_coloring', 'braids_weaves', 'nail_care', 'makeup', 'facial');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  role user_role DEFAULT 'customer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  category service_category NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stylists table
CREATE TABLE IF NOT EXISTS public.stylists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  specialties TEXT[],
  bio TEXT,
  experience_years INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stylist_id UUID REFERENCES public.stylists(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status appointment_status DEFAULT 'pending',
  notes TEXT,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stylist_id UUID REFERENCES public.stylists(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
DROP TRIGGER IF EXISTS update_stylists_updated_at ON public.stylists;
DROP TRIGGER IF EXISTS update_appointments_updated_at ON public.appointments;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stylists_updated_at
  BEFORE UPDATE ON public.stylists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample services (only if table is empty)
INSERT INTO public.services (name, description, price, duration, category)
SELECT * FROM (VALUES
  ('Hair Wash & Blow Dry', 'Professional hair washing and styling with premium products', 80.00, 60, 'hair_styling'::service_category),
  ('Haircut & Style', 'Expert haircut tailored to your face shape and style preference', 120.00, 90, 'hair_styling'::service_category),
  ('Full Color Treatment', 'Complete hair coloring with high-quality dyes and conditioning', 200.00, 180, 'hair_coloring'::service_category),
  ('Highlights & Lowlights', 'Professional highlighting technique for dimensional color', 180.00, 150, 'hair_coloring'::service_category),
  ('Box Braids', 'Traditional protective braiding style with quality extensions', 150.00, 240, 'braids_weaves'::service_category),
  ('Weave Installation', 'Expert weave installation with natural-looking results', 200.00, 180, 'braids_weaves'::service_category),
  ('Manicure & Pedicure', 'Complete nail care with polish and design options', 60.00, 75, 'nail_care'::service_category),
  ('Professional Makeup', 'Full face makeup for special events and occasions', 100.00, 60, 'makeup'::service_category),
  ('Deep Cleansing Facial', 'Rejuvenating facial treatment for healthy, glowing skin', 80.00, 90, 'facial'::service_category)
) AS v(name, description, price, duration, category)
WHERE NOT EXISTS (SELECT 1 FROM public.services LIMIT 1);

-- Insert sample stylists (only if table is empty)
INSERT INTO public.stylists (name, specialties, bio)
SELECT * FROM (VALUES
  ('Sarah Johnson', ARRAY['Hair Styling', 'Coloring'], 'Expert stylist with 10+ years experience in modern cuts and color techniques'),
  ('Emma Williams', ARRAY['Braids', 'Natural Hair'], 'Specialist in protective styles and natural hair care with a passion for healthy hair'),
  ('Grace Asante', ARRAY['Makeup', 'Facial'], 'Professional makeup artist and esthetician with expertise in bridal and special event makeup'),
  ('Akosua Mensah', ARRAY['Hair Styling', 'Weaves'], 'Creative stylist specializing in trendy cuts and flawless weave installations'),
  ('Ama Osei', ARRAY['Nail Care', 'Facial'], 'Licensed nail technician and esthetician with 8+ years of experience')
) AS v(name, specialties, bio)
WHERE NOT EXISTS (SELECT 1 FROM public.stylists LIMIT 1);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stylists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can view active services" ON public.services;
DROP POLICY IF EXISTS "Only admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Anyone can view active stylists" ON public.stylists;
DROP POLICY IF EXISTS "Only admins can manage stylists" ON public.stylists;
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can create their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Stylists can view appointments assigned to them" ON public.appointments;
DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can create reviews for their appointments" ON public.reviews;
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Services policies (public read access)
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage services" ON public.services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Stylists policies (public read access)
CREATE POLICY "Anyone can view active stylists" ON public.stylists
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage stylists" ON public.stylists
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON public.appointments
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Users can create their own appointments" ON public.appointments
  FOR INSERT WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Users can update their own appointments" ON public.appointments
  FOR UPDATE USING (customer_id = auth.uid());

CREATE POLICY "Stylists can view appointments assigned to them" ON public.appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stylists 
      WHERE id = stylist_id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all appointments" ON public.appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their appointments" ON public.reviews
  FOR INSERT WITH CHECK (
    customer_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE id = appointment_id AND customer_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE USING (customer_id = auth.uid());

-- Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_appointments_customer_id ON public.appointments(customer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_stylist_id ON public.appointments(stylist_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_stylists_specialties ON public.stylists USING GIN(specialties);
CREATE INDEX IF NOT EXISTS idx_reviews_appointment_id ON public.reviews(appointment_id);
CREATE INDEX IF NOT EXISTS idx_reviews_stylist_id ON public.reviews(stylist_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
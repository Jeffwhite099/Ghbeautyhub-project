import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  // Sign up with email and password
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get user session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Profiles
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
    return { data, error }
  },

  // Services
  getServices: async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name')
    return { data, error }
  },

  getService: async (id) => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  getServicesByCategory: async (category) => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category', category)
      .order('name')
    return { data, error }
  },

  // Stylists
  getStylists: async () => {
    const { data, error } = await supabase
      .from('stylists')
      .select('*')
      .order('name')
    return { data, error }
  },

  getStylist: async (id) => {
    const { data, error } = await supabase
      .from('stylists')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  // Appointments
  getAppointments: async (userId) => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        services (*),
        stylists (*)
      `)
      .eq('user_id', userId)
      .order('appointment_date', { ascending: false })
    return { data, error }
  },

  createAppointment: async (appointmentData) => {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
    return { data, error }
  },

  updateAppointment: async (id, updates) => {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
    return { data, error }
  },

  deleteAppointment: async (id) => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)
    return { error }
  }
}

export default supabase 
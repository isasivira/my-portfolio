import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aiuwqtkgtyvnjfzytlbe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpdXdxdGtndHl2bmpmenl0bGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2OTk2NDMsImV4cCI6MjA1NzI3NTY0M30.La0cf4zZVMDUlYlwVjwUysmsJPr9CVcvSLNwczZ75pA'

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit'
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  db: {
    schema: 'public'
  },
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      credentials: 'include',
      mode: 'cors'
    })
  }
})

export default supabase 
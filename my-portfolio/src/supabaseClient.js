import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aiuwqtkgtyvnjfzytlbe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpdXdxdGtndHl2bmpmenl0bGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2OTk2NDMsImV4cCI6MjA1NzI3NTY0M30.La0cf4zZVMDUlYlwVjwUysmsJPr9CVcvSLNwczZ75pA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
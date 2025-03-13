import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import supabase from './supabaseClient';
import Login from './components/Login';
import Presentation from './components/Presentation';
import PublicProjects from './components/PublicProjects';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import theme from './theme';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div style={styles.app}>
        <Navigation user={user} onSignOut={handleSignOut} />
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Presentation />} />
            <Route path="/projects" element={<PublicProjects />} />
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/login" 
              element={
                !user ? (
                  <Login />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: theme.colors.background
  },
  content: {
    paddingTop: '1rem'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.colors.background
  },
  loadingSpinner: {
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
    boxShadow: theme.shadows.medium
  }
};

export default App;
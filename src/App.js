import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import supabase from './supabaseClient';
import Login from './components/Login';
import Landing from './components/Landing';
import PublicProjects from './components/PublicProjects';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import About from './components/About';
import './App.css';

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
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navigation user={user} onSignOut={handleSignOut} />
        <main className="content desktop-content-offset">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/projects" element={<PublicProjects />} />
            <Route path="/about" element={<About />} />
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
        </main>
      </div>
    </Router>
  );
}

export default App;
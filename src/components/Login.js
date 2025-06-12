import React, { useState } from 'react';
import supabase from '../supabaseClient';
// import theme from '../theme'; // Remove theme import as styles are now in CSS
import './Login.css'; // Import the new CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      setError(error.message);
    } else {
      console.log('Logged in:', user);
      setMessage('Successfully logged in!');
    }

    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting password reset for email:', email);
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        console.error('Password reset error:', error);
        if (error.message.includes('Failed to fetch')) {
          setError('Network error: Please check your internet connection and try again.');
        } else {
          setError(error.message || 'Failed to send password reset email. Please try again.');
        }
      } else {
        console.log('Password reset email sent successfully');
        setMessage('Password reset instructions have been sent to your email');
      }
    } catch (err) {
      console.error('Unexpected error during password reset:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
          <div className="header-icon">✨</div>
          <h1 className="title">Welcome Back!</h1>
          <p className="subtitle">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleLogin} className="form">
          <div className="form-group">
            <label htmlFor="email" className="label">
              <span className="label-icon">📧</span>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">
              <span className="label-icon">🔒</span>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>

          {error && (
            <div className="error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {message && (
            <div className="message">
              <span className="message-icon">✨</span>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <span className="button-icon">⏳</span>
                Signing in...
              </>
            ) : (
              <>
                <span className="button-icon">✨</span>
                Sign In
              </>
            )}
          </button>

          <button 
            type="button"
            onClick={handleResetPassword}
            disabled={loading}
            className="reset-button"
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 
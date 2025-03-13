import React, { useState } from 'react';
import supabase from '../supabaseClient';
import theme from '../theme';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log('Logged in:', user);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <div style={styles.headerIcon}>✨</div>
          <h1 style={styles.title}>Welcome Back!</h1>
          <p style={styles.subtitle}>Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              <span style={styles.labelIcon}>📧</span>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              <span style={styles.labelIcon}>🔒</span>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.error}>
              <span style={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={styles.submitButton}
          >
            {loading ? (
              <>
                <span style={styles.buttonIcon}>⏳</span>
                Signing in...
              </>
            ) : (
              <>
                <span style={styles.buttonIcon}>✨</span>
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px)',
    padding: '20px',
    backgroundColor: 'rgba(255, 182, 193, 0.05)',
    '@media (max-width: 768px)': {
      padding: '16px',
      minHeight: 'calc(100vh - 56px)'
    }
  },
  loginCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 20px rgba(255, 182, 193, 0.15)',
    border: '1px solid rgba(255, 182, 193, 0.2)',
    '@media (max-width: 768px)': {
      padding: '24px',
      borderRadius: '16px'
    }
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    '@media (max-width: 768px)': {
      marginBottom: '24px'
    }
  },
  headerIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    animation: 'bounce 2s infinite',
    '@media (max-width: 768px)': {
      fontSize: '40px',
      marginBottom: '12px'
    }
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '28px',
    color: theme.colors.primary,
    fontWeight: '600',
    '@media (max-width: 768px)': {
      fontSize: '24px'
    }
  },
  subtitle: {
    margin: 0,
    color: theme.colors.textLight,
    fontSize: '16px',
    '@media (max-width: 768px)': {
      fontSize: '14px'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    '@media (max-width: 768px)': {
      gap: '20px'
    }
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.colors.text,
    '@media (max-width: 768px)': {
      fontSize: '13px'
    }
  },
  labelIcon: {
    fontSize: '16px',
    '@media (max-width: 768px)': {
      fontSize: '14px'
    }
  },
  input: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid rgba(255, 182, 193, 0.3)',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 182, 193, 0.05)',
    transition: 'all 0.3s ease-in-out',
    '@media (max-width: 768px)': {
      padding: '10px 14px',
      fontSize: '14px',
      borderRadius: '10px'
    },
    ':focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
      boxShadow: '0 0 0 3px rgba(255, 165, 192, 0.2)'
    }
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
    color: '#ff6347',
    fontSize: '14px',
    '@media (max-width: 768px)': {
      padding: '10px',
      fontSize: '13px'
    }
  },
  errorIcon: {
    fontSize: '16px',
    '@media (max-width: 768px)': {
      fontSize: '14px'
    }
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: theme.colors.primary,
    color: '#ffffff',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 2px 8px rgba(255, 182, 193, 0.3)',
    '@media (max-width: 768px)': {
      padding: '10px',
      fontSize: '14px',
      borderRadius: '10px'
    },
    ':hover': {
      backgroundColor: theme.colors.primaryDark,
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(255, 182, 193, 0.4)',
      '& span': {
        transform: 'scale(1.1)'
      }
    },
    ':active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(255, 182, 193, 0.2)'
    },
    ':disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    }
  },
  buttonIcon: {
    fontSize: '18px',
    transition: 'transform 0.3s ease-in-out',
    display: 'inline-block',
    '@media (max-width: 768px)': {
      fontSize: '16px'
    }
  }
};

export default Login; 
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import theme from '../theme';

const Navigation = ({ user, onSignOut }) => {
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.leftSection}>
        <Link to="/" style={styles.logo}>Portfolio</Link>
        <Link to="/projects" style={styles.link}>Projects</Link>
      </div>
      <div style={styles.rightSection}>
        {user ? (
          <>
            <span style={styles.email}>{user.email}</span>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="secondary"
              style={{ marginRight: '10px' }}
            >
              Dashboard
            </Button>
            <Button 
              onClick={onSignOut}
              variant="danger"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button 
            onClick={() => navigate('/login')}
            variant="primary"
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: theme.colors.white,
    boxShadow: theme.shadows.small,
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.colors.primary,
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
    ':hover': {
      color: theme.colors.accent
    }
  },
  link: {
    color: theme.colors.text,
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.2s ease-in-out',
    ':hover': {
      color: theme.colors.primary
    }
  },
  email: {
    color: theme.colors.textLight,
    marginRight: '1rem'
  }
};

export default Navigation; 
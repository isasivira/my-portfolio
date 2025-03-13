import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import theme from '../theme';

const Navigation = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div style={styles.topBar}>
        <button style={styles.hamburgerButton} onClick={toggleMenu}>
          <span className="material-symbols-outlined" style={styles.menuIcon}>
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
        <div style={styles.welcomeText}>Welcome☀️</div>
      </div>

      <div style={{
        ...styles.sideMenu,
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)'
      }}>
        <div style={styles.menuHeader}>
          <Link to="/" style={styles.logo} onClick={() => setIsMenuOpen(false)}>
            <span style={styles.logoIcon}>✨</span>
            Portfolio
          </Link>
        </div>

        <div style={styles.menuContent}>
          <Link to="/" style={styles.menuLink} onClick={() => setIsMenuOpen(false)}>
            <span className="material-symbols-outlined" style={styles.linkIcon}>home</span>
            Home
          </Link>
          <Link to="/projects" style={styles.menuLink} onClick={() => setIsMenuOpen(false)}>
            <span className="material-symbols-outlined" style={styles.linkIcon}>palette</span>
            Projects
          </Link>

          {user && (
            <button 
              onClick={() => {
                navigate('/dashboard');
                setIsMenuOpen(false);
              }}
              style={styles.menuButton}
            >
              <span className="material-symbols-outlined" style={styles.buttonIcon}>dashboard</span>
              Dashboard
            </button>
          )}

          {user ? (
            <>
              <div style={styles.userInfo}>
                <span className="material-symbols-outlined" style={styles.emailIcon}>person</span>
                <span style={styles.email}>{user.email}</span>
              </div>
              <button 
                onClick={() => {
                  onSignOut();
                  setIsMenuOpen(false);
                }}
                style={{ ...styles.menuButton, ...styles.dangerButton }}
              >
                <span className="material-symbols-outlined" style={styles.buttonIcon}>logout</span>
                Sign Out
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                navigate('/login');
                setIsMenuOpen(false);
              }}
              style={styles.menuButton}
            >
              <span className="material-symbols-outlined" style={styles.buttonIcon}>login</span>
              Sign In
            </button>
          )}
        </div>

        <div style={styles.menuFooter}>
          <p style={styles.footerText}>Made with 💖</p>
        </div>
      </div>

      {isMenuOpen && (
        <div style={styles.overlay} onClick={toggleMenu}></div>
      )}
    </>
  );
};

const styles = {
  topBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: theme.colors.white,
    boxShadow: theme.shadows.medium,
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    zIndex: 998
  },
  welcomeText: {
    fontSize: '24px',
    fontWeight: '600',
    color: theme.colors.primary,
    marginLeft: '20px'
  },
  hamburgerButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 182, 193, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      transform: 'scale(1.1)'
    }
  },
  menuIcon: {
    fontSize: '28px',
    color: theme.colors.primary,
    transition: 'transform 0.3s ease-in-out'
  },
  sideMenu: {
    position: 'fixed',
    top: '60px',
    left: 0,
    bottom: 0,
    width: '280px',
    backgroundColor: theme.colors.white,
    boxShadow: theme.shadows.large,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (max-width: 768px)': {
      width: '100%'
    }
  },
  overlay: {
    position: 'fixed',
    top: '60px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    animation: 'fadeIn 0.3s ease-in-out'
  },
  menuHeader: {
    padding: '24px',
    borderBottom: '1px solid rgba(255, 182, 193, 0.2)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '24px',
    fontWeight: '600',
    color: theme.colors.primary,
    textDecoration: 'none',
    transition: 'transform 0.2s ease-in-out',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  logoIcon: {
    fontSize: '28px'
  },
  menuContent: {
    flex: 1,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  menuLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: theme.colors.text,
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '12px',
    borderRadius: '12px',
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      backgroundColor: 'rgba(255, 182, 193, 0.1)',
      color: theme.colors.primary,
      transform: 'translateX(4px)'
    }
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 182, 193, 0.1)',
    color: theme.colors.primary,
    width: '100%',
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      backgroundColor: 'rgba(255, 182, 193, 0.2)',
      transform: 'translateX(4px)'
    }
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'rgba(255, 182, 193, 0.05)',
    borderRadius: '12px',
    marginTop: 'auto'
  },
  email: {
    color: theme.colors.textLight,
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  emailIcon: {
    fontSize: '20px',
    color: theme.colors.textLight
  },
  linkIcon: {
    fontSize: '24px',
    color: theme.colors.primary
  },
  buttonIcon: {
    fontSize: '24px',
    color: theme.colors.primary,
    transition: 'transform 0.3s ease-in-out'
  },
  dangerButton: {
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
    color: '#ff6347',
    boxShadow: '0 2px 8px rgba(255, 99, 71, 0.2)',
    ':hover': {
      backgroundColor: 'rgba(255, 99, 71, 0.2)',
      boxShadow: '0 4px 12px rgba(255, 99, 71, 0.3)'
    }
  },
  menuFooter: {
    padding: '24px',
    textAlign: 'center',
    borderTop: '1px solid rgba(255, 182, 193, 0.2)'
  },
  footerText: {
    color: theme.colors.textLight,
    fontSize: '14px',
    margin: 0
  }
};

export default Navigation; 
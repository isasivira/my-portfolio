import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import theme from '../theme';
import './Navigation.css';

const Navigation = ({ user, onSignOut }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="top-navigation">
        <div className="menu-header">
          <Link to="/" className="logo">
            <span className="logo-icon">✨</span>
            Portfolio
          </Link>
        </div>

        <div className="menu-content">
          <Link to="/" className="menu-link">
            <span className="link-icon">🏠</span>
            Home
          </Link>
          <Link to="/projects" className="menu-link">
            <span className="link-icon">🎨</span>
            Projects
          </Link>
          <Link to="/about" className="menu-link">
            <span className="link-icon">ℹ️</span>
            About
          </Link>

          {user && (
            <button 
              onClick={() => {
                navigate('/dashboard');
              }}
              className="menu-button"
            >
              <span className="button-icon">📊</span>
              Dashboard
            </button>
          )}

          {user ? (
            <>
              <div className="user-info">
                <span className="email-icon">👤</span>
                <span className="email">{user.email}</span>
              </div>
              <button 
                onClick={() => {
                  onSignOut();
                }}
                className="menu-button danger-button"
              >
                <span className="button-icon">🚪</span>
                Sign Out
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                navigate('/login');
              }}
              className="menu-button"
            >
              <span className="button-icon">🔑</span>
              Sign In
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation; 
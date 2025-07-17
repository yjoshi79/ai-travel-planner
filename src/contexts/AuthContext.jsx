import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = Cookies.get('travel_ai_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        Cookies.remove('travel_ai_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual user data from API
      const userData = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
        avatar: null
      };

      // Save user data with 60-minute expiration
      Cookies.set('travel_ai_user', JSON.stringify(userData), { 
        expires: 1/24, // 1 hour (1/24 of a day)
        secure: true,
        sameSite: 'strict'
      });

      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual user data from API
      const userData = {
        id: Date.now(),
        email,
        name,
        avatar: null
      };

      // Save user data with 60-minute expiration
      Cookies.set('travel_ai_user', JSON.stringify(userData), { 
        expires: 1/24, // 1 hour (1/24 of a day)
        secure: true,
        sameSite: 'strict'
      });

      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    Cookies.remove('travel_ai_user');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser({ token });
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser({ token: res.data.token });
      return true;
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      await axios.post('/api/v1/auth/register', { email, password });
      return true;
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
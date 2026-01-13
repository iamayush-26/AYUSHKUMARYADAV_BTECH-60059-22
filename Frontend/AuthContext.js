import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize axios with base URL
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Set axios interceptor to include token in requests
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/users/profile');
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('/auth/login', { email, password });
      
      const { token, ...userData } = response.data.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await axios.post('/auth/register', { name, email, password });
      
      const { token, ...userData } = response.data.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    window.location.href = '/login';
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/users/profile', profileData);
      setUser(response.data.data);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      return { success: false, message };
    }
  };

  const deleteAccount = async () => {
    try {
      await axios.delete('/users/profile');
      logout();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Delete failed';
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      updateProfile,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
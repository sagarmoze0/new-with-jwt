import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const result = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('user', JSON.stringify(result.data));
      setUser(result.data);
      toast('Login Successful');
      navigate('/home');
    } catch (error) {
      toast('Something went wrong');
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    try {
      if (password !== confirmPassword) {
        toast('Password and Confirm Password do not match');
        return;
      }
      await axios.post('/api/users/register', { name, email, password, confirmPassword });
      toast('Registration successful, Please login');
      navigate('/login'); 
    } catch (error) {
      toast('Something went wrong');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

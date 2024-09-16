import axios from 'axios';

// Create Axios instance with base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance with security headers
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  timeout: 5000, // 5 seconds timeout to prevent hanging requests
});

// Function to register a new user
export const registerUser = async (username: string, password: string, role: string) => {
  const response = await apiClient.post('/users/register', {
    username,
    password,
    role
  });
  return response.data;
};

// Function to login user
export const loginUser = async (username: string, password: string) => {
  const response = await apiClient.post('/users/login', {
    username,
    password
  });
  return response.data;
};

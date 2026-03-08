// API Configuration
// This file centralizes the API URL configuration

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;

// Usage in components:
// import API_URL from '../config/api';
// axios.get(`${API_URL}/api/endpoint`)

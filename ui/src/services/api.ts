import axios from 'axios';

const apiFallbackURL = 'http://localhost:3000';

const apiService = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL ?? apiFallbackURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiService;

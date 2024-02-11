import axios from 'axios';

const apiService = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiService;

import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'https://product-manager.up.railway.app',
});

export default api;

import axios from 'axios';

// Replace 'YOUR_LOCAL_IP_ADDRESS' with the actual IP address
const LOCAL_IP_ADDRESS = '127.0.0.1';

const api = axios.create({
  baseURL: `http://${LOCAL_IP_ADDRESS}:8000/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

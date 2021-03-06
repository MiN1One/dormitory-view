import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3005/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
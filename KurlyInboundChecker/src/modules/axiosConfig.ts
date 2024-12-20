import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = 'your-token-here'; // 예시 토큰

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    console.error(222, JSON.stringify(error));
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.data) {
      console.error(JSON.stringify(error.response.data));
    } else {
      console.error(1111, JSON.stringify(error));
    }
    return Promise.reject(error.response.data);
  },
);

export default axiosInstance;

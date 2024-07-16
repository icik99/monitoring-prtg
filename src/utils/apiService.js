import axios from "axios";

const apiService = axios.create({
  // baseURL: 'http://localhost:5005/',
  baseURL: process.env.NEXT_BACKEND_API_URL,
  timeout: 60000,
});

export default apiService;

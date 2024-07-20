import axios from "axios";

const apiService = axios.create({
  // baseURL: 'http://localhost:5005/',
  baseURL: process.env.NEXT_PUBLIC_URL_LOCAL,
  timeout: 60000,
});

export default apiService;

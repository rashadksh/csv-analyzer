import axios from 'axios';

export const baseAPI = axios.create({
  baseURL: process.env.NX_APP_API_URL || 'http://localhost:3000/api',
});

import axios from "axios";
const base_url = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: base_url,
});

export const privateApi = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;

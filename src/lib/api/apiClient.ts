import axios from "axios";
import { useLoadingStore } from "../zustand/loadingStore";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

let activeRequests = 0;
const loadingStore = useLoadingStore.getState();

apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.showLoading) {
      activeRequests++;
      loadingStore.setLoading(true);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.config.showLoading) {
      activeRequests--;
      loadingStore.setLoading(false);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized, maybe token expired.");
    }
    if (error.config.showLoading) {
      activeRequests--;
      loadingStore.setLoading(false);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

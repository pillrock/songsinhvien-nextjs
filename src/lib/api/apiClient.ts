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
      console.warn("⚠️ Lỗi xác thực, có thể token hết hạn.");
    }
    if (error.config.showLoading) {
      activeRequests--;
      loadingStore.setLoading(false);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

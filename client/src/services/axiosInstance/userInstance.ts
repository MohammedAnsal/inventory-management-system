import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "../../store/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL;

export const userAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const publicAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const controllerMap = new Map();

// Request Interceptor
userAxiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!config.signal) {
    const controller = new AbortController();
    config.signal = controller.signal;
    controllerMap.set(config.url, controller);
  }

  return config;
});

// Response Interceptor
userAxiosInstance.interceptors.response.use(
  (response) => {
    controllerMap.delete(response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url;
    const status = error.response?.status;

    if (error.response) {
      // Handle 401 — token expired, try refresh
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await getNewAccessToken();

          if (newAccessToken) {
            localStorage.setItem("access-token", newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return userAxiosInstance(originalRequest);
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (err) {
          toast.error("Session expired, please log in again.");
          useAuthStore.getState().logout();
          localStorage.removeItem("access-token");
          return Promise.reject(err);
        }
      }

      // Handle 403 — only treat as blocked if it's NOT the refresh endpoint
      if (status === 403 && !url?.includes("/api/auth/refresh-token")) {
        toast.error("Access denied. Please log in again.");
        useAuthStore.getState().logout();
        localStorage.removeItem("access-token");
        return Promise.reject(new Error("Access forbidden"));
      }

      if (status >= 500) {
        toast.error("Server error, please try again later.");
      }
    } else if (error.request) {
      toast.error("Network error, please check your connection.");
    } else {
      toast.error("An unexpected error occurred.");
    }

    controllerMap.delete(url);
    return Promise.reject(error);
  },
);

async function getNewAccessToken(): Promise<string | null> {
  try {
    const response = await axios.get(`${API_URL}/api/auth/refresh-token`, {
      withCredentials: true,
    });

    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

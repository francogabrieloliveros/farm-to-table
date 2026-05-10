import axios from "axios";

const api = axios.create({
  baseURL: "/", // Change this if you have a different base URL for your API
});

// Request Interceptor: Automatically attach the token to every request
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      try {
        const { token } = JSON.parse(stored);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing auth token from localStorage", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (cb: () => void) => {
  logoutCallback = cb;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_user");
      if (logoutCallback) {
        logoutCallback();
      }
    }
    return Promise.reject(error);
  }
);

export default api;

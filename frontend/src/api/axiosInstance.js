import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 👇 call refresh endpoint
        await axiosInstance.get("/refresh");

        // 👇 retry original request after token is refreshed
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed. Logging out user.");
        // You can redirect to login page or handle logout here
        window.location.href = "/login";

      }
    }

    return Promise.reject(error);
  }
);






export default axiosInstance
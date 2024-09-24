import axios from "axios";
import { getToken, removeToken } from "./utils/authUtils";
import { backend_url } from "./utils/settings";
import useCustomNavigation from "./routes/useCustomNavigation";
import { useSnackbar } from "./contexts/SnackbarContext";

const useAxiosInstance = () => {
  const { loginPage } = useCustomNavigation(); // Now inside a hook
  const { showSnackbar } = useSnackbar();
  const axiosInstance = axios.create({
    baseURL: backend_url,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Fix template string syntax
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response, // Simply return the response if it's successful
    async (error) => {
      const { response } = error;

      if (response && response.status === 401) {
        // Call signOut function to remove the token
        showSnackbar("Session expired. Please log in again.");

        // Optional: Delay before redirecting to the login page
        await new Promise((resolve) => setTimeout(resolve, 2000));
        removeToken();
        loginPage();
      }

      return Promise.reject(error); // Reject the promise to propagate the error
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;

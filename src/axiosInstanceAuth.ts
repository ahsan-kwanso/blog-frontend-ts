import axios from "axios";
import { getToken } from "./utils/authUtils";
import { backend_url } from "./utils/settings";

const axiosInstanceAuth = axios.create({
  baseURL: backend_url,
});

//Now I don't have to include the token every time
axiosInstanceAuth.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstanceAuth;

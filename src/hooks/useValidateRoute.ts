// src/hooks/useValidateRoute.ts
import { useEffect, useState } from "react";
import axiosInstanceAuth from "../axiosInstanceAuth";
import { API_URL } from "../utils/settings";

export const useValidateRoute = (): any => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateRoute = async () => {
      try {
        const response = await axiosInstanceAuth.get(API_URL.protectedCheck);
        setIsAuthenticated(response.status === 200); // Assuming a 200 response means valid token
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsAuthenticated(false); // Set to false if the token is invalid or an error occurs
      } finally {
        setLoading(false);
      }
    };

    validateRoute();
  }, []);

  return { isAuthenticated, loading }; // Return both authentication status and loading state
};

import { useState, useEffect, useContext } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { ErrorResponse } from "../types/Error.interfaces";
import {
  UserWithNumberOfPosts,
  UseFetchUsersReturn,
} from "../types/User.interfaces";

const useFetchUsers = (): UseFetchUsersReturn => {
  const [users, setUsers] = useState<UserWithNumberOfPosts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useError();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(
          API_URL.users // Assuming the API URL is /users
        );

        // Access users from the response data
        const usersData = response.data; // Adjust this if the structure is different
        setUsers(usersData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          const axiosError = err as { response?: { data?: ErrorResponse } };

          // Handle the error response
          const errorMessage =
            axiosError.response?.data?.message ?? "Failed to delete comment.";
          setError(errorMessage);
        } else {
          setError("Failed to delete comment.");
        }
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchUsers(); // Trigger the fetch
  }, [setError]); // Dependencies for useEffect

  return { users, isLoading, error };
};

export default useFetchUsers;

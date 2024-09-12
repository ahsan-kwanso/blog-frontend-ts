import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { ErrorResponse } from "../types/Error.interfaces";
import {
  UserWithNumberOfPosts,
  UseFetchUsersReturn,
} from "../types/User.interfaces";

const useFetchUsers = (page: number, limit: number): UseFetchUsersReturn => {
  const [users, setUsers] = useState<UserWithNumberOfPosts[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useError();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 400));
      const params = { page, limit };
      const response = await axiosInstance.get(
        API_URL.users, // Assuming the API URL is /users
        { params }
      );
      const { users, total, nextPage } = response.data;
      setUsers(users);
      setTotal(total);
      setNextPage(nextPage);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: ErrorResponse } };

        // Handle the error response
        const errorMessage =
          axiosError.response?.data?.message ?? "Failed to fetch users.";
        setError(errorMessage);
      } else {
        setError("Failed to fetch users.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchUsers(); // Trigger the fetch on mount
  }, []); // Dependencies for useEffect

  return { users, isLoading, error, fetchUsers, total, nextPage };
};

export default useFetchUsers;

import { useState } from "react";
import useAxiosInstance from "../axiosInstance";
import { API_URL } from "../utils/settings";
import { ErrorResponse } from "../types/Error.interfaces";
import { UserEditRoleReturn } from "../types/User.interfaces";
import { useError } from "./useError";

const useEditUserRole = (): UserEditRoleReturn => {
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useError();

  const editUserRole = async (userId: number, role: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.patch(`${API_URL.users}/${userId}`, { role });
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: ErrorResponse } };
        const errorMessage =
          axiosError.response?.data?.message ?? "Failed to modify role.";
        setError(errorMessage);
      } else {
        setError("Failed to modify role.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { editUserRole, isLoading, error };
};

export default useEditUserRole;

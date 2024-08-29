import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";

interface ErrorResponse {
  message: string;
}

export const useDeleteComment = () => {
  const [error, setError] = useError();
  const [success, setSuccess] = useState<string | null>(null);

  const deleteComment = async (commentId: string) => {
    try {
      const response = await axiosInstance.delete(`${API_URL.comment}/${commentId}`);
      if (response.status === 200) {
        setSuccess("Comment deleted successfully");
        return true;
      } else {
        setError("Failed to delete comment");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: ErrorResponse } };
        
        // Handle the error response
        const errorMessage = axiosError.response?.data?.message ?? "Failed to delete comment.";
        setError(errorMessage);
      } else {
        setError("Failed to delete comment.");
      }
    }
    return false;
  };

  return { deleteComment, error, success };
};

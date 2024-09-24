import { useState } from "react";
import useAxiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { ErrorResponse } from "../types/Error.interfaces";
import { UseDeleteCommentReturn } from "../types/Comment.interfaces";
import { AxiosResponse } from "axios";

export const useDeleteComment = (): UseDeleteCommentReturn => {
  const axiosInstance = useAxiosInstance();
  const [error, setError] = useError();
  const [success, setSuccess] = useState<string | null>(null);

  const deleteComment = async (commentId: number): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete<
        boolean,
        AxiosResponse<boolean>,
        number
      >(`${API_URL.comment}/${commentId}`);
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
        const errorMessage =
          axiosError.response?.data?.message ?? "Failed to delete comment.";
        setError(errorMessage);
      } else {
        setError("Failed to delete comment.");
      }
    }
    return false;
  };

  return { deleteComment, error, success };
};

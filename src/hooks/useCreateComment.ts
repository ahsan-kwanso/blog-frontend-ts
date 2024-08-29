// src/hooks/useCreateComment.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";

interface ErrorResponse {
  message: string;
}

export const useCreateComment = () => {
  const [error, setError] = useError();
  const [success, setSuccess] = useState<string | null>(null);

  const createComment = async (data : any) => {
    try {
      const response = await axiosInstance.post(API_URL.comment, data);
      setSuccess("Comment created successfully!");
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: ErrorResponse } };

        // Use optional chaining and nullish coalescing to handle possible undefined values
        const errorMessage = axiosError.response?.data?.message ?? "Failed to create comment.";
        setError(errorMessage);
      } else {
        // Handle other possible cases of `err`
        setError("Failed to create comment.");
      }
      throw err; // Rethrow to handle error in the component if needed
    }
  };

  return { createComment, error, success };
};

export default useCreateComment;

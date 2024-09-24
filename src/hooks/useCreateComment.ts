// src/hooks/useCreateComment.js
import { useState } from "react";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { ErrorResponse } from "../types/Error.interfaces";
import {
  CreateCommentData,
  Comment as CommentResponse,
  UseCreateCommentReturn,
} from "../types/Comment.interfaces";
import { AxiosResponse } from "axios";
import useAxiosInstance from "../axiosInstance";

export const useCreateComment = (): UseCreateCommentReturn => {
  const axiosInstance = useAxiosInstance();
  const [error, setError] = useError();
  const [success, setSuccess] = useState<string | null>(null);

  const createComment = async (
    data: CreateCommentData
  ): Promise<CommentResponse> => {
    try {
      const response = await axiosInstance.post<
        CommentResponse,
        AxiosResponse<CommentResponse>,
        CreateCommentData
      >(API_URL.comment, data);
      setSuccess("Comment created successfully!");
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: ErrorResponse } };

        // Use optional chaining and nullish coalescing to handle possible undefined values
        const errorMessage =
          axiosError.response?.data?.message ?? "Failed to create comment.";
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

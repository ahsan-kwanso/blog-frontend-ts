// src/hooks/useCreatePost.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { ErrorResponse } from "../types/Error.interfaces";
import { PostData, Post as PostResponse } from "../types/Post.interfaces";
import { AxiosResponse } from "axios";

const useCreatePost = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useError();
  const [success, setSuccess] = useState<string | null>(null);

  const createPost = async (data  : PostData) : Promise<PostResponse> => {
    setIsCreating(true);
    setError(null); // Reset error state
    setSuccess(null); // Reset success state
    try {
      const response = await axiosInstance.post<PostResponse, AxiosResponse<PostResponse>, PostData>(API_URL.post, data);
      setSuccess("Post created successfully!");
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: ErrorResponse } };

        // Use optional chaining to handle possible undefined values
        const errorMessage = axiosError.response?.data?.message ?? "Failed to create post.";
        setError(errorMessage);
      } else {
        // Handle other possible cases of `err`
        setError("Failed to create post.");
      }
      throw err; // Rethrow to handle error in the component if needed
    }finally {
      setIsCreating(false);
    }
  };

  return { createPost, isCreating, error, success };
};

export default useCreatePost;

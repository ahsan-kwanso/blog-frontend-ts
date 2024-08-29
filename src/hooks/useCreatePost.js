// src/hooks/useCreatePost.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";

const useCreatePost = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useError();
  const [success, setSuccess] = useState(null);

  const createPost = async (data) => {
    setIsCreating(true);
    setError(null); // Reset error state
    setSuccess(null); // Reset success state
    try {
      const response = await axiosInstance.post(API_URL.post, data);
      setSuccess("Post created successfully!");
      return response.data;
    } catch (err) {
      // Handle error based on response
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Failed to create post.");
      } else {
        setError("Failed to create post.");
      }
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return { createPost, isCreating, error, success };
};

export default useCreatePost;

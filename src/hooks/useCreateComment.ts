// src/hooks/useCreateComment.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";

export const useCreateComment = () => {
  const [error, setError] = useError();
  const [success, setSuccess] = useState(null);

  const createComment = async (data) => {
    try {
      const response = await axiosInstance.post(API_URL.comment, data);
      setSuccess("Comment created successfully!");
      return response.data;
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to create comment.");
      } else {
        setError("Failed to create comment.");
      }
      throw err; // Rethrow to handle error in the component if needed
    }
  };

  return { createComment, error, success };
};

export default useCreateComment;

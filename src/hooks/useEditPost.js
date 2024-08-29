// src/hooks/useEditPost.js
import { useState } from "react";
import axiosInstance from "../axiosInstance"; // Adjust the path as needed
import { useError } from "./useError";
import { API_URL } from "../utils/settings";

const useEditPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useError();
  const [success, setSuccess] = useState(null);

  const editPost = async (postId, postData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axiosInstance.put(
        `${API_URL.post}/${postId}`,
        postData
      );
      setSuccess("Post updated successfully!");
      return response.data;
    } catch (err) {
      setError("Failed to update the post. Please try again.");
      throw err; // Re-throw the error to handle it in the onSubmit function
    } finally {
      setLoading(false);
    }
  };

  return { editPost, loading, error, success };
};

export default useEditPost;

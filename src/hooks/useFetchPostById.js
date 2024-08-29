// src/hooks/useFetchPost.js
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";

const useFetchPost = (postId) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useError();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        const response = await axiosInstance.get(`${API_URL.post}/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError("Failed to Load Post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, setError]);

  return { post, isLoading, error };
};

export default useFetchPost;

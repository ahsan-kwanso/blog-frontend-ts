// src/hooks/useFetchPost.js
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";

interface Post {
  id: number;
  title: string;
  content: string;
  UserId: number;
  createdAt: string;
  updatedAt: string;
}

const useFetchPostById = (postId : number) => {
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useError();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        const response = await axiosInstance.get<Post>(`${API_URL.post}/${postId}`);
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

export default useFetchPostById;

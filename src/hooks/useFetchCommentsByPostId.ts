// src/hooks/useFetchPost.js
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { Comment } from "../types/Comment.interfaces";

const useFetchCommentsByPostId = (postId : number, refresh : number) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useError();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get<{ comments: Comment[] }>(
          `${API_URL.comment}/post/${postId}`
        );
        setComments(response.data.comments);
      } catch (err) {
        setError("Failed to Load Post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, refresh, setError]);

  return { comments, isLoading, error };
};

export default useFetchCommentsByPostId;

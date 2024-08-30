// src/hooks/useFetchPost.js
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";

// Define interfaces for the comments
interface SubComment {
  id: number;
  title: string;
  content: string;
  UserId: number;
  PostId: number;
  ParentId: number | null;
  createdAt: string;
  updatedAt: string;
  subComments: SubComment[]; // Recursive type for nested sub-comments
}

interface Comment extends SubComment {
  subComments: SubComment[]; // Top-level comments also have sub-comments
}

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

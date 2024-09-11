// src/hooks/useDeletePost.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { AxiosResponse } from "axios";
import {
  OnSuccessCallback,
  DeletePostResponse,
  UseDeletePostReturn,
} from "../types/Post.interfaces";

const useDeletePost = (): UseDeletePostReturn => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useError();

  const deletePost = async (
    postId: number,
    onSuccess: OnSuccessCallback
  ): Promise<void> => {
    try {
      setIsDeleting(true);
      const response = await axiosInstance.delete<
        DeletePostResponse,
        AxiosResponse<DeletePostResponse>,
        number
      >(`${API_URL.post}/${postId}`);

      if (
        response.data.message === "Post deleted successfully" ||
        response.status === 200
      ) {
        onSuccess(); // Callback to refresh the posts list or handle success
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred while deleting the post.");
    } finally {
      setIsDeleting(false);
    }
  };

  return { deletePost, isDeleting, error };
};

export default useDeletePost;

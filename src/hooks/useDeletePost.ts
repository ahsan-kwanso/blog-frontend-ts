// src/hooks/useDeletePost.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { AxiosResponse } from "axios";

type OnSuccessCallback = () => void;
type DeletePostResponse = {
  message: string;
};

const useDeletePost = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useError();

  const deletePost = async (postId : number, onSuccess: OnSuccessCallback) : Promise<void> => {
    try {
      setIsDeleting(true);
      const response = await axiosInstance.delete<DeletePostResponse, AxiosResponse<DeletePostResponse>, number>(`${API_URL.post}/${postId}`);
      if (response.data.message === "Post deleted successfully") {
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

// src/hooks/useEditPost.js
import { useState } from "react";
import useAxiosInstance from "../axiosInstance"; // Adjust the path as needed
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import {
  EditPostData,
  Post as PostResponse,
  UseEditPostReturn,
} from "../types/Post.interfaces";
import { AxiosResponse } from "axios";

const useEditPost = (): UseEditPostReturn => {
  const axiosInstance = useAxiosInstance();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useError();
  const [success, setSuccess] = useState<string | null>(null);

  const editPost = async (
    postId: number,
    postData: EditPostData
  ): Promise<PostResponse> => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axiosInstance.put<
        PostResponse,
        AxiosResponse<PostResponse>,
        EditPostData
      >(`${API_URL.post}/${postId}`, postData);
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

// src/hooks/useDeleteComment.js
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";

export const useDeleteComment = () => {
  const [error, setError] = useError();
  const [success, setSuccess] = useState(null);

  const deleteComment = async (commentId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_URL.comment}/${commentId}`
      );
      if (response.status === 200) {
        setSuccess("Comment deleted successfully");
        return true;
      } else {
        setError("Failed to delete comment");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401)
          setError("You can't delete this comment");
        else setError(err.response.data.message || "Failed to delete comment");
      } else {
        setError("Failed to delete comment");
      }
      //console.error("Error caught:", err);
    }
  };

  return { deleteComment, error, success };
};

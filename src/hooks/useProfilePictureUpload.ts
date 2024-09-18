// src/hooks/useProfilePictureUpload.js
import { useState } from "react";
import { ErrorResponse } from "../types/Error.interfaces";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";

const useProfilePictureUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useError();

  const uploadProfilePicture = async (userId: string, file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file); // Append the file to the FormData

    try {
      const response = await axiosInstance.post(
        `/users/${userId}/upload-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      return response.data; // Return the updated user data with the new profile picture URL
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: ErrorResponse } };
        const errorMessage =
          axiosError.response?.data?.message ?? "Failed to upload picture.";
        setError(errorMessage);
      }
      throw err;
    }
  };

  return {
    uploadProfilePicture,
    loading,
    error,
  };
};

export default useProfilePictureUpload;

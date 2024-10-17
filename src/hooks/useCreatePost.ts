// // src/hooks/useCreatePost.js
// import { useState } from "react";
// import useAxiosInstance from "../axiosInstance";
// import { useError } from "./useError";
// import { API_URL } from "../utils/settings";
// import { ErrorResponse } from "../types/Error.interfaces";
// import {
//   PostData,
//   Post as PostResponse,
//   UseCreatePostReturn,
// } from "../types/Post.interfaces";
// import { AxiosResponse } from "axios";

// const useCreatePost = (): UseCreatePostReturn => {
//   const axiosInstance = useAxiosInstance();
//   const [isCreating, setIsCreating] = useState(false);
//   const [error, setError] = useError();
//   const [success, setSuccess] = useState<string | null>(null);

//   const createPost = async (data: PostData): Promise<PostResponse> => {
//     setIsCreating(true);
//     setError(null); // Reset error state
//     setSuccess(null); // Reset success state
//     try {
//       const response = await axiosInstance.post<
//         PostResponse,
//         AxiosResponse<PostResponse>,
//         PostData
//       >(API_URL.post, data);
//       setSuccess("Post created successfully!");
//       return response.data;
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         const axiosError = err as { response?: { data?: ErrorResponse } };

//         // Use optional chaining to handle possible undefined values
//         const errorMessage =
//           axiosError.response?.data?.message ?? "Failed to create post.";
//         setError(errorMessage);
//       } else {
//         // Handle other possible cases of `err`
//         setError("Failed to create post.");
//       }
//       throw err; // Rethrow to handle error in the component if needed
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   return { createPost, isCreating, error, success };
// };

// export default useCreatePost;

// src/hooks/useCreatePost.js
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { useError } from "./useError";
import {
  PostData,
  Post as PostResponse,
  UseCreatePostReturn,
} from "../types/Post.interfaces";
import { CREATE_POST_MUTATION } from "../GraphQL/mutations";

const useCreatePost = (): UseCreatePostReturn => {
  const [createPostMutation, { loading, error, data }] =
    useMutation(CREATE_POST_MUTATION);
  const [errorState, setError] = useError();
  const [success, setSuccess] = useState<string | null>(null);

  const createPost = async (data: PostData): Promise<PostResponse> => {
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const response = await createPostMutation({
        variables: { createPostDto: data },
      });

      setSuccess("Post created successfully!");
      return response.data.createPost; // Adjust based on your response structure
    } catch (err) {
      setError("Failed to create post.");
      throw err; // Rethrow to handle error in the component if needed
    }
  };

  return {
    createPost,
    isCreating: loading,
    error: errorState || error?.message || "",
    success,
  };
};

export default useCreatePost;

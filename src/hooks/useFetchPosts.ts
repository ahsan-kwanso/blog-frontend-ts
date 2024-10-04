import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UseFetchPostsReturn } from "../types/Post.interfaces";
import { GET_POSTS } from "../GraphQL/queries";

const useFetchPosts = (
  isMyPosts: boolean,
  page: number,
  limit: number
): UseFetchPostsReturn => {
  const { user } = useContext(AuthContext);
  const userId = isMyPosts ? user?.id : null; // Only fetch user ID when necessary
  const filter = isMyPosts ? "my-posts" : null;

  const variables: any = { page, limit }; // Always include page and limit

  // Add optional fields if they exist
  if (filter) {
    variables.filter = filter;
  }
  if (userId !== null) {
    variables.userId = userId;
  }

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables,
    fetchPolicy: "network-only", // Adjust fetch policy as needed
  });

  const posts = data?.getPosts.posts || [];
  const total = data?.getPosts.total || 0;
  const nextPage = data?.getPosts.nextPage || null;

  return {
    posts,
    total,
    nextPage,
    isLoading: loading,
    error: error?.message || "",
  };
};

export default useFetchPosts;

import { useState, useEffect, useContext } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { AuthContext } from "../contexts/AuthContext";
import {
  FetchPostsResponse,
  PostWithAuthor,
  UseFetchPostsReturn,
} from "../types/Post.interfaces";

const useFetchPosts = (
  isMyPosts: boolean,
  page: number,
  limit: number
): UseFetchPostsReturn => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useError();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Construct params object conditionally
        const defaultParams = { page, limit };
        const myPostsParams = {
          page,
          limit,
          filter: "my-posts",
          userId: user?.id,
        };

        // Determine which params to use
        const params = isMyPosts ? myPostsParams : defaultParams;

        const response = await axiosInstance.get<FetchPostsResponse>(
          API_URL.post,
          { params }
        );
        const { posts, total, nextPage } = response.data;

        setPosts(posts);
        setTotal(total);
        setNextPage(nextPage);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [isMyPosts, page, limit, user?.id, setError]);

  return { posts, total, nextPage, isLoading, error };
};

export default useFetchPosts;

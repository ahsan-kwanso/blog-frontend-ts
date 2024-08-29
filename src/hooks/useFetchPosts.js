import { useState, useEffect, useContext } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { AuthContext } from "../contexts/AuthContext";

const useFetchPosts = (isMyPosts, page, limit) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

        const response = await axiosInstance.get(API_URL.post, { params });
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

// src/hooks/useSearchPosts.js
import { useState, useEffect, useContext } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { AuthContext } from "../contexts/AuthContext";

const useFetchSearchPosts = (title, page, limit, isMyPosts) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [error, setError] = useError();
  const [total, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const defaultParams = { title, page, limit };
        const myPostsParams = {
          title,
          page,
          limit,
          filter: "my-posts",
          userId: user?.id,
        };

        // Determine which params to use
        const params = isMyPosts ? myPostsParams : defaultParams;
        const response = await axiosInstance.get(API_URL.searchPosts, {
          params,
        });
        setPosts(response.data.posts);
        setTotalPosts(response.data.total);
        setNextPage(response.data.nextPage);
      } catch (err) {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchPosts();
    }
  }, [title, page, limit, setError, isMyPosts]);

  return { posts, nextPage, isLoading, error, total };
};

export default useFetchSearchPosts;

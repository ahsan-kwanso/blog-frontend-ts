// src/hooks/useSearchPosts.js
import { useState, useEffect, useContext } from "react";
import axiosInstance from "../axiosInstance";
import { useError } from "./useError";
import { API_URL } from "../utils/settings";
import { AuthContext } from "../contexts/AuthContext";

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
}

// FetchPostsResponse interface to define the structure of the API response
interface FetchPostsResponse {
  total: number;
  page: number;
  pageSize: number;
  nextPage: string | null;
  posts: Post[];
}

const useFetchSearchPosts = (title : string, page : number, limit : number, isMyPosts : boolean) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [error, setError] = useError();
  const [total, setTotalPosts] = useState<number>(0);

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
        const response = await axiosInstance.get<FetchPostsResponse>(API_URL.searchPosts, {
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

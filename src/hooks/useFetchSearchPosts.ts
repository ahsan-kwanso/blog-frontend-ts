import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UseFetchPostsReturn } from "../types/Post.interfaces";

// Define the GraphQL query
const GET_SEARCH_POSTS = gql`
  query GetSearchPosts(
    $title: String!
    $page: Float!
    $limit: Float!
    $filter: String
    $userId: Float
  ) {
    searchPosts(
      paginationQuery: {
        title: $title
        page: $page
        limit: $limit
        filter: $filter
        userId: $userId
      }
    ) {
      posts {
        id
        title
        content
        date
      }
      total
      nextPage
      page
      pageSize
    }
  }
`;

const useFetchSearchPosts = (
  title: string,
  isMyPosts: boolean,
  page: number,
  limit: number
): UseFetchPostsReturn => {
  const { user } = useContext(AuthContext);
  const userId = isMyPosts ? user?.id : null; // Only fetch user ID when necessary
  const filter = isMyPosts ? "my-posts" : null;

  const variables: any = { title, page, limit }; // Always include title, page, and limit

  // Add optional fields if they exist
  if (filter) {
    variables.filter = filter;
  }
  if (userId !== null) {
    variables.userId = userId;
  }

  const { loading, error, data } = useQuery(GET_SEARCH_POSTS, {
    variables,
    fetchPolicy: "network-only", // Adjust fetch policy as needed
  });

  const posts = data?.searchPosts.posts || [];
  const total = data?.searchPosts.total || 0;
  const nextPage = data?.searchPosts.nextPage || null;

  return {
    posts,
    total,
    nextPage,
    isLoading: loading,
    error: error?.message || "",
  };
};

export default useFetchSearchPosts;

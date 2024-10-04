// GraphQL/queries.js

import { gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      name
      email
      profilePictureUrl
      role {
        name
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers(
    $page: Float!
    $limit: Float!
    $sortBy: String
    $sortOrder: String
    $role: String
  ) {
    findAllPaginated(
      pagination: {
        page: $page
        limit: $limit
        sortBy: $sortBy
        sortOrder: $sortOrder
        role: $role
      }
    ) {
      users {
        id
        name
        email
        role
        posts
      }
      total
      page
      pageSize
      nextPage
    }
  }
`;

// Define the GraphQL query
export const GET_POSTS = gql`
  query GetPosts(
    $page: Float!
    $limit: Float!
    $filter: String
    $userId: Float
  ) {
    getPosts(
      paginationQuery: {
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
        author
      }
      total
      page
      pageSize
      nextPage
    }
  }
`;

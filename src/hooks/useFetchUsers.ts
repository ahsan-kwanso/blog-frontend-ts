import { useQuery } from "@apollo/client";
import { useError } from "./useError";
import { GET_USERS } from "../GraphQL/queries"; // Adjust the import path
import {
  UserWithNumberOfPosts,
  UseFetchUsersReturn,
} from "../types/User.interfaces";

interface FetchUsersParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  role?: string;
}

const useFetchUsers = (
  page: number,
  limit: number,
  sortBy?: string,
  sortOrder?: "asc" | "desc",
  role?: string
): UseFetchUsersReturn => {
  // Prepare the variables object
  const variables: any = { page, limit }; // Always include page and limit

  // Add optional fields if they exist
  if (sortBy) {
    variables.sortBy = sortBy;
  }
  if (sortOrder) {
    variables.sortOrder = sortOrder;
  }
  if (role) {
    variables.role = role;
  }

  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables,
    fetchPolicy: "network-only", // Adjust fetch policy as needed
  });

  const users = data?.findAllPaginated.users || [];
  const total = data?.findAllPaginated.total || 0;
  const nextPage = data?.findAllPaginated.nextPage || null;

  // Custom fetch function to allow manual refetching
  const fetchUsers = async () => {
    try {
      await refetch(); // Refetch with current variables
    } catch (err) {
      // Handle any errors if necessary
    }
  };

  return {
    users,
    isLoading: loading,
    error: error?.message || "",
    total,
    nextPage,
    fetchUsers, // Include fetchUsers in the return value
  };
};

export default useFetchUsers;

import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Box,
  Pagination,
  Snackbar,
  Alert,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import PostList from "../components/PostList";
import useFetchPosts from "../hooks/useFetchPosts";
import useFetchSearchPosts from "../hooks/useFetchSearchPosts";
import { defaultLimit, defaultPage } from "../utils/pagination";
import SearchField from "../components/SearchField";
import CreatePostButton from "../components/CreatePostButton";
import Sidebar from "../components/Sidebar";
import RowsPerPageSelect from "../components/RowsPerPageSelect";
import NoPostsMessage from "../components/NoPostsMessage";
import { AuthContext } from "../contexts/AuthContext";

const Posts = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const page = parseInt(searchParams.get("page") ?? `${defaultPage}`);
  const limit = parseInt(searchParams.get("limit") ?? `${defaultLimit}`);
  const searchQuery = searchParams.get("search") || "";
  const isMyPosts = searchParams.get("filter") === "my-posts";

  const [rowsPerPage, setRowsPerPage] = useState<number>(limit);

  const {
    posts: postsSearch,
    total: totalSearch,
    isLoading: isLoadingSearch,
    error: errorSearch,
  } = useFetchSearchPosts(searchQuery, page, rowsPerPage, isMyPosts);

  const {
    posts: postsDefault,
    total: totalDefault,
    isLoading: isLoadingDefault,
    error: errorDefault,
  } = useFetchPosts(isMyPosts, page, rowsPerPage);

  const posts = searchQuery ? postsSearch : postsDefault;
  const total = searchQuery ? totalSearch : totalDefault;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingDefault;
  const error = searchQuery ? errorSearch : errorDefault;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // Define the type for newParams
    const newParams: Record<string, string> = {
      page: value.toString(),
      limit: rowsPerPage.toString(),
    };

    if (searchQuery) {
      newParams.search = searchQuery;
    }
    if (isMyPosts) {
      newParams.filter = "my-posts";
    }

    setSearchParams(newParams);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newLimit = event.target.value as string;
    setRowsPerPage(Number(newLimit)); // Ensure rowsPerPage is a number

    // Define the type for newParams
    const newParams: Record<string, string> = {
      page: "1", // Set page to 1 when changing rows per page
      limit: newLimit,
    };

    if (searchQuery) {
      newParams.search = searchQuery;
    }
    if (isMyPosts) {
      newParams.filter = "my-posts";
    }

    setSearchParams(newParams);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container
        component="main"
        maxWidth="xl"
        sx={{ marginLeft: { xs: 7, sm: 10 }, flexGrow: 1 }}
      >
        <Box
          sx={{
            padding: { xs: 0, sm: 4 },
          }}
        >
          <Box
            sx={{
              top: 64,
              zIndex: 1,
              backgroundColor: "inherit",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              mt: {
                xs: 10,
                sm: 5,
                md: 3,
              },
              ml: 2,
              mr: 2,
            }}
          >
            <SearchField />
            <CreatePostButton />
          </Box>
          {error && (
            <Snackbar open autoHideDuration={6000}>
              <Alert severity="error">{error}</Alert>
            </Snackbar>
          )}
          <NoPostsMessage isLoading={isLoading} posts={posts} />
          <>
            <PostList
              posts={posts}
              isLoading={isLoading}
              showEdit={isMyPosts ? true : false}
              showDelete={isMyPosts || isAdmin ? true : false}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 2,
                mb: 8,
              }}
            >
              <Pagination
                count={Math.ceil(total / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
              <RowsPerPageSelect
                rowsPerPage={rowsPerPage}
                onChange={handleRowsPerPageChange}
              />
            </Box>
          </>
        </Box>
      </Container>
    </Box>
  );
};

export default Posts;

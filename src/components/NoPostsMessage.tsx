import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { NoPostsMessageProps } from "../types/Post.interfaces";

const NoPostsMessage = ({ isLoading, posts }: NoPostsMessageProps): JSX.Element => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && posts.length === 0) {
      const timer = setTimeout(() => setShowMessage(true), 401); // Wait for 401ms
      return () => clearTimeout(timer);
    } else {
      setShowMessage(false);
    }
  }, [isLoading, posts]);

  if (isLoading) return <></>; // Use empty fragment instead of null

  return showMessage ? (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 1,
        boxShadow: 3,
        padding: 2,
        margin: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" color="textSecondary">
        No posts available.
      </Typography>
    </Box>
  ) : <></>; // Use empty fragment instead of null
};

export default NoPostsMessage;

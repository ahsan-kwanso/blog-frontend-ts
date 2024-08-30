import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

interface NoPostsMessageProps {
  isLoading: boolean;
  posts: any[]; // You can specify a more precise type if you have one
}

const NoPostsMessage = ({ isLoading, posts } : NoPostsMessageProps) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!isLoading && posts.length === 0) {
      const timer = setTimeout(() => setShowMessage(true), 401); // Wait for 401ms
      return () => clearTimeout(timer);
    } else {
      setShowMessage(false);
    }
  }, [isLoading, posts]);

  if (isLoading) return null; // Don't show the message while loading

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
  ) : null;
};

export default NoPostsMessage;

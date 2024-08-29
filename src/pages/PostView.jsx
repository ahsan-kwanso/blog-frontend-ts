import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Divider,
  Skeleton,
  Alert,
  Snackbar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import PostDetails from "../components/PostDetails";
import CommentSection from "../components/CommentSection";
import useFetchPostById from "../hooks/useFetchPostById";
import useFetchCommentsByPostId from "../hooks/useFetchCommentsByPostId";
import useCustomNavigation from "../routes/useCustomNavigation";

// Styled components for Skeleton
const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const PostView = () => {
  const { postId } = useParams();
  const [refresh, setRefresh] = useState(0);
  const { post, isLoading, error } = useFetchPostById(postId);
  const { comments } = useFetchCommentsByPostId(postId, refresh);
  const { postsPage } = useCustomNavigation();
  const handleCommentSubmit = () => {
    setRefresh((prev) => prev + 1); // Increment refresh count to trigger refetch
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        postsPage();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        paddingX: { xs: 1, sm: 3, md: 4 }, // Adjust horizontal padding for different screen sizes
      }}
    >
      <Box
        sx={{
          padding: { xs: 1, sm: 4 }, // Adjust padding for different screen sizes
          marginTop: "64px",
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: { xs: 1, sm: 3 }, // Adjust shadow intensity for different screen sizes
        }}
      >
        {error && (
          <Box sx={{ textAlign: "center" }}>
            <Snackbar open autoHideDuration={6000}>
              <Alert severity="error">{error}</Alert>
            </Snackbar>
            <Alert severity="info" sx={{ mb: 2 }}>
              No post found.
            </Alert>
          </Box>
        )}
        {isLoading ? (
          <>
            <StyledSkeleton variant="rectangular" height={300} sx={{ mb: 2 }} />
            <StyledSkeleton variant="text" sx={{ fontSize: "2rem", mb: 2 }} />
            <StyledSkeleton variant="text" sx={{ mb: 2 }} />
            <StyledSkeleton variant="text" sx={{ mb: 2 }} />
            <Divider sx={{ my: 4 }} />
            <StyledSkeleton variant="text" sx={{ mb: 2 }} />
            <StyledSkeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
          </>
        ) : (
          <>
            {post && (
              <PostDetails post={post} onReplySubmit={handleCommentSubmit} />
            )}
            <Divider sx={{ my: 4 }} />
            {post && (
              <CommentSection
                comments={comments}
                onReplySubmit={handleCommentSubmit}
              />
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default PostView;

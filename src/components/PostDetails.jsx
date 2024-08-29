// src/components/PostDetails.jsx
import React, { useState } from "react";
import { Box, Typography, CardMedia, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getRandomImage } from "../utils/getRandomImage";
import { format } from "date-fns";
import ReplyForm from "./ReplyForm"; // Assuming you have a ReplyForm component
import useCustomNavigation from "../routes/useCustomNavigation";
import { useNavigation } from "react-router-dom";

const PostCard = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const PostImage = styled(CardMedia)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover",
  width: "100%",
  height: "100%",
  maxHeight: 300,
}));

const PostDetails = ({ post, onReplySubmit }) => {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
  const { postsPage } = useCustomNavigation();

  const handleBackToDashboard = () => {
    postsPage();
  };

  const handleReplyClick = () => {
    setIsReplyFormVisible(true);
  };

  const handleCloseReplyForm = () => {
    setIsReplyFormVisible(false);
    onReplySubmit(); //trigger refresh
  };

  return (
    <PostCard>
      <PostImage component="img" image={getRandomImage()} alt={post?.title} />
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginTop: 2 }}
      >
        {post?.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ marginTop: 1, textAlign: "justify" }}
      >
        {post?.content}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ marginTop: 1 }}
      >
        {`Posted on ${format(new Date(post?.createdAt), "MMMM dd, yyyy")}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          flexDirection: "row",
          "@media (max-width: 350px)": {
            flexDirection: "column", // Switch to column at 350px or below
          },
        }}
      >
        {!isReplyFormVisible && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleReplyClick}
            sx={{
              marginBottom: "10px",
            }}
          >
            Reply
          </Button>
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBackToDashboard}
          sx={{
            marginBottom: "10px",
          }}
        >
          Back to Dashboard
        </Button>
      </Box>
      {isReplyFormVisible && (
        <ReplyForm
          onClose={handleCloseReplyForm}
          postId={post?.id}
          parentId={null}
        />
      )}
    </PostCard>
  );
};

export default PostDetails;

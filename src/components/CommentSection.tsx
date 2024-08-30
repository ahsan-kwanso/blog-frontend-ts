import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Comment from "./Comment";
import { CommentSectionProps } from "../types/Comment.interfaces";

const CommentSection = ({ comments, onReplySubmit } : CommentSectionProps) => {
  if (comments === null) {
    return (
      <Typography variant="body1" color="textSecondary">
        No comments available.
      </Typography>
    );
  }
  return (
    <Box>
      {comments?.map((comment) => (
        <Box key={comment.id} sx={{ marginBottom: 4 }}>
          <Comment comment={comment} onReplySubmit={onReplySubmit} />
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default CommentSection;

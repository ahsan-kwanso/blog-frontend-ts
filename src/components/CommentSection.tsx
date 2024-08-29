import React from "react";
import { Box, Divider } from "@mui/material";
import Comment from "./Comment";

const CommentSection = ({ comments, onReplySubmit }) => {
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

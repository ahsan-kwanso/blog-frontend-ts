import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Comment from "./Comment";

interface SubComment {
  id: number;
  title: string;
  content: string;
  UserId: number;
  PostId: number;
  ParentId: number | null;
  createdAt: string;
  updatedAt: string;
  subComments: SubComment[];
}

interface CommentSectionProps {
  comments: SubComment[] | null; // Make sure to use the type you defined earlier
  onReplySubmit: () => void;
}
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

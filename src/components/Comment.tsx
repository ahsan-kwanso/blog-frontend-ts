// src/components/Comment.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyForm from "./ReplyForm";
import { format } from "date-fns";
import { useDeleteComment } from "../hooks/useDeleteComment";

const Comment = ({ comment, onReplySubmit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [replying, setReplying] = useState(false);
  const { deleteComment, error, success } = useDeleteComment();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReply = () => {
    setReplying(true);
    handleMenuClose();
  };

  const handleCloseReplyForm = () => {
    setReplying(false);
    onReplySubmit();
  };

  const handleDelete = async () => {
    const success = await deleteComment(comment.id);
    if (success) {
      onReplySubmit(); // Refresh content after deletion
    }
    handleMenuClose(); // Close menu after delete
  };

  return (
    <Box sx={{ padding: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" color="text.primary">
          {comment.content}
        </Typography>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleReply}>Reply</MenuItem>
        </Menu>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
        {`Posted on ${format(new Date(comment.createdAt), "MMMM dd, yyyy")}`}
      </Typography>
      {replying && (
        <ReplyForm
          onClose={handleCloseReplyForm}
          postId={comment.PostId}
          parentId={comment.id}
        />
      )}
      {comment?.subComments && (
        <Box sx={{ ml: 4 }}>
          {comment.subComments.map((subComment) => (
            <Comment
              key={subComment.id}
              comment={subComment}
              onReplySubmit={onReplySubmit}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Comment;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import { getRandomImage } from "../utils/getRandomImage";
import useDeletePost from "../hooks/useDeletePost";
import useCustomNavigation from "../routes/useCustomNavigation";
import ConfirmAlert from "../Alerts/ConfirmAlert";
import SuccessAlert from "../Alerts/SuccessAlert";
import { PostProps } from "../types/Post.interfaces";

const PostCard = styled(Card)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(2),
  minHeight: 400,
}));

const PostImage = styled(CardMedia)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover",
  width: "100%",
  height: "100%",
  maxHeight: 140,
  minHeight: 140,
}));


const Post = ({
  id,
  author,
  image,
  title,
  content,
  date,
  showEdit,
  showDelete,
} : PostProps): JSX.Element => {
  const { viewPostPage, editPostPage } = useCustomNavigation();
  const { deletePost, error: deleteError } = useDeletePost();

  const onPostDeletion = () => {
    setTimeout(() => {
      window.location.reload(); // Reload the window after showing success message
    }, 800); // Adjust delay if needed
  };
  // Event handler functions
  const handleView = () => {
    viewPostPage(id); // Navigate to the PostView route
  };

  const handleEdit = () => {
    editPostPage(id); // Navigate to the EditPost route
  };

  const handleDelete = async () => {
    const confirmed = await ConfirmAlert(
      "Are you sure?",
      "Do you want to delete this post?"
    );

    if (confirmed) {
      deletePost(id, async () => {
        await SuccessAlert("Deleted!", "Your post has been deleted.");
        //setSuccessMessage("Post deleted successfully");
        onPostDeletion();
      });
    }
  };

  return (
    <PostCard>
      {/* <PostImage component="img" image={getRandomImage()} alt={title} /> */}
      <PostImage image={getRandomImage()}/>
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          {author}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {format(new Date(date), "MMMM dd, yyyy")}
        </Typography>
        <Typography variant="h6" component="div">
          {title?.length > 22 ? `${title.substring(0, 22)}...` : title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "justify" }}
        >
          {content?.length > 110 ? `${content.substring(0, 110)}...` : content}
        </Typography>
      </CardContent>
      <IconButton onClick={handleView} color="primary" sx={{ margin: 2 }}>
        <VisibilityIcon />
      </IconButton>
      {showEdit && (
        <IconButton onClick={handleEdit} color="secondary">
          <EditIcon />
        </IconButton>
      )}
      {showDelete && (
        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
      )}
      {deleteError && (
        <Snackbar open={Boolean(deleteError)} autoHideDuration={6000}>
          <Alert severity="error">{deleteError}</Alert>
        </Snackbar>
      )}
    </PostCard>
  );
};

export default Post;

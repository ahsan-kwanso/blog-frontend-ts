// src/pages/EditPost.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useFetchPostById from "../hooks/useFetchPostById";
import useEditPost from "../hooks/useEditPost";
import { postSchema } from "../validations/schemaValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import useCustomNavigation from "../routes/useCustomNavigation";

const EditPost = () => {
  const { postId } = useParams<{ postId: string }>(); // Ensure postId is a string
  const numericPostId = postId ? parseInt(postId, 10) : null;
  const { myPostsPage, postsPage } = useCustomNavigation();
  const { post, isLoading, error: fetchError } = useFetchPostById(numericPostId as number); // Pass the Post type to the hook
  const { editPost, error, success } = useEditPost();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (post) {
      setValue("title", (post as any).title);
      setValue("content", (post as any).content);
    }
  }, [post, setValue]);

  const onSubmit = async (data: { title: string; content: string }) => {
    try {
      await editPost(numericPostId as number, data);

      if (!error) {
        myPostsPage();
      }
    } catch (e) {
      console.error("Unexpected error:", e);
    }
  };

  const handleCancel = () => {
    postsPage();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
          alignItems: "center",
          padding: 3,
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5">Edit Post</Typography>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : fetchError ? (
          <Typography color="error">{fetchError}</Typography>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", marginTop: "16px" }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="title"
              label="Title"
              autoComplete="title"
              autoFocus
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="content"
              label="Content"
              multiline
              rows={5}
              {...register("content")}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
              Last Updated:{" "}
              {post?.updatedAt
                ? new Date(post.updatedAt).toLocaleDateString()
                : "N/A"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                width: "100%",
                "@media (max-width: 280px)": {
                  flexDirection: "column",
                },
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "auto", marginBottom: "10px" }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
                sx={{ width: "auto", marginBottom: "10px" }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Box>
      {success && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default EditPost;

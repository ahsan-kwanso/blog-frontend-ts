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
import useCustomNavigation from "../routes/useCustomNavigation";
import useCreatePost from "../hooks/useCreatePost";
import { postSchema } from "../validations/schemaValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostData } from "../types/Post.interfaces";

const CreatePost = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { myPostsPage, postsPage } = useCustomNavigation();
  const { createPost, isCreating, error, success } = useCreatePost();

  const onSubmit = async (data: PostData) => {
    try {
      await createPost(data);
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
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
          alignItems: "center",
          padding: 3,
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginLeft: {
            xs: "90px", // Add left margin for extra-small screens
          },
          marginBottom: {
            xs: "90px",
          },
        }}
      >
        <Typography variant="h5">Create Post</Typography>
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
            rows={6} // Increased height for content box
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              width: "100%",
              "@media (max-width: 280px)": {
                flexDirection: "column", // Switch to column at 350px or below
              },
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "auto", marginBottom: "10px" }}
              disabled={isCreating}
            >
              Create
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
      </Box>
      {error && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default CreatePost;

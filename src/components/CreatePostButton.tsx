// src/components/CreatePostButton.jsx
import { Button } from "@mui/material";
import useCustomNavigation from "../routes/useCustomNavigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";

const CreatePostButton = () => {
  const { createPostPage } = useCustomNavigation();
  const isSmallScreen = useMediaQuery("(max-width:750px)");

  const handleCreatePost = () => {
    createPostPage(); // route to create post
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreatePost}
      sx={{ marginLeft: 2 }}
    >
      {isSmallScreen ? <AddIcon /> : "Create Post"}
    </Button>
  );
};

export default CreatePostButton;

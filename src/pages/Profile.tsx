import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  Avatar,
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  styled,
  Dialog,
  IconButton,
} from "@mui/material";
import { stringAvatar } from "../utils/avatarUtils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import useCustomNavigation from "../routes/useCustomNavigation";
import useProfilePictureUpload from "../hooks/useProfilePictureUpload";

// Maximum file size in bytes (e.g., 2MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// Allowed image types
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Styled Input to hide the default file input
const HiddenInput = styled("input")({
  display: "none",
});

const Profile = (): JSX.Element => {
  const { postsPage } = useCustomNavigation();
  const { user, setUser } = useContext(AuthContext); // Assume setUser is available to update the user
  const { uploadProfilePicture, loading, error } = useProfilePictureUpload(); // Hook for upload logic
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the selected file
  const [fileError, setFileError] = useState<string | null>(null); // Store file error
  const [open, setOpen] = useState(false);

  const handleBack = () => {
    postsPage();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check if the file type is allowed
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError("Only JPEG, PNG, or GIF files are allowed");
        setSelectedFile(null);
        return;
      }

      // Check if the file size exceeds the maximum size
      if (file.size > MAX_FILE_SIZE) {
        setFileError("File size must be less than 2MB");
        setSelectedFile(null);
        return;
      }

      // Clear any previous errors and set the file
      setFileError(null);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        if (user) {
          const updatedUser = await uploadProfilePicture(user.id, selectedFile);

          // Update the user context to reflect the new profile picture immediately
          setUser({
            ...user,
            profilePictureUrl: updatedUser.profilePictureUrl, // Assuming response contains the updated picture URL
          });

          // Clear selected file after successful upload
          setSelectedFile(null);
        }
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };

  // Handle profile picture click (open modal)
  const handlePictureClick = () => {
    setOpen(true); // Open the dialog when profile picture is clicked
  };

  // Close profile picture modal
  const handleClose = () => {
    setOpen(false);
  };

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginTop: "100px",
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            marginBottom: 2,
            padding: 1,
            cursor: "pointer", // Add pointer to indicate it's clickable
          }}
          onClick={handlePictureClick} // Open modal on click
        >
          {user.profilePictureUrl ? (
            <Avatar
              src={user.profilePictureUrl} // Fetch the profile picture URL
              sx={{ width: 60, height: 60, fontSize: 24 }}
            />
          ) : (
            <Avatar
              {...stringAvatar(user.name)}
              sx={{ width: 60, height: 60, fontSize: 24 }}
            />
          )}
        </Box>

        <Typography variant="h5" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {user.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Dashboard
          </Button>
        </Box>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  flexGrow: 1,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {selectedFile
                  ? `${selectedFile.name.slice(0, 8)}${
                      selectedFile.name.length > 8 ? "..." : ""
                    }`
                  : "Choose File"}
              </Button>
            </label>
            <HiddenInput
              id="file-upload"
              type="file"
              accept="image/*" // Accept only image files
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpload}
              sx={{ flexShrink: 0 }}
              disabled={!selectedFile || !!fileError} // Disable upload if no file or there is a file error
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Uploading...
                </>
              ) : (
                "Upload Picture"
              )}
            </Button>
          </Box>

          {/* Show file validation error */}
          {fileError && (
            <Typography color="error" variant="body2">
              {fileError}
            </Typography>
          )}

          {/* Show error message if upload fails */}
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box sx={{ position: "relative", padding: 2 }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Larger profile picture */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              src={user.profilePictureUrl}
              sx={{ width: 200, height: 200 }} // Larger avatar size
            />
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Profile;

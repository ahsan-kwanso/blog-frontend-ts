// src/pages/Profile.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, Container, Typography, Box, Button } from "@mui/material";
import { stringAvatar } from "../utils/avatarUtils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useCustomNavigation from "../routes/useCustomNavigation";

const Profile = () => {
  const { postsPage } = useCustomNavigation();
  const { user } = useContext(AuthContext);

  const handleBack = () => {
    postsPage();
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
            width: 80, // Adjusted size of the circle
            height: 80, // Adjusted size of the circle
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: "none",
            marginBottom: 2,
            padding: 1, // Added padding around the Avatar
          }}
        >
          <Avatar
            {...stringAvatar(user.name)}
            sx={{ width: 60, height: 60, fontSize: 24 }}
          />
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
      </Box>
    </Container>
  );
};

export default Profile;

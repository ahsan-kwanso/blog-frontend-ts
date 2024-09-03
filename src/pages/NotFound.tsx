// src/pages/NotFound.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import useCustomNavigation from "../routes/useCustomNavigation";

const NotFound = () : JSX.Element => {
  const { postsPage } = useCustomNavigation();
  const handleClick = () => {
    postsPage();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          sx={{ mt: "20px" }}
        >
          Go to Homepage
        </Button>
      </Box>
    </>
  );
};

export default NotFound;

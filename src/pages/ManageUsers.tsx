import React, { useContext } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import UserTable from "../components/UserTable";
import BackToDashboardButton from "../components/BackToDashboardButton";
import { AuthContext } from "../contexts/AuthContext";

const ManageUsers = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const isAdmin: boolean = user?.role === "admin";
  return isAdmin ? (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        marginTop: "80px", // Adjusted margin for centering
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centers the content horizontally
        justifyContent: "center", // Centers the content vertically
      }}
    >
      <Box sx={{ my: 3, textAlign: "center", width: "100%" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold", // Make the title bold for emphasis
            color: "primary.main", // Use theme's primary color for the title
          }}
        >
          User Management
        </Typography>
        <Paper
          sx={{
            p: 4, // More padding for a cleaner layout
            width: "100%", // Full width for the table to fit the container
            maxWidth: "800px", // Set a max width for the content
            boxShadow: 3, // Add some shadow for depth
            borderRadius: 2, // Rounded corners for a modern look
            position: "relative", // Set relative positioning for the Paper
          }}
        >
          <UserTable />
          <Box
            sx={{
              position: "absolute",
              right: 0, // Aligns the button to the right
              mt: 5,
              mr: 2, // Margin right for spacing
            }}
          >
            <BackToDashboardButton />
          </Box>
        </Paper>
      </Box>
    </Container>
  ) : (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          marginTop: "80px", // Adjusted margin for centering
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centers the content horizontally
          justifyContent: "center", // Centers the content vertically
        }}
      >
        <Box sx={{ my: 3, textAlign: "center", width: "100%" }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold", // Make the title bold for emphasis
              color: "primary.main", // Use theme's primary color for the title
            }}
          >
            You are not Authorized to this Page.
          </Typography>
          <BackToDashboardButton />
        </Box>
      </Container>
    </>
  );
};

export default ManageUsers;

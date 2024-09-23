import React from "react";
import IconButton from "@mui/material/IconButton";
import { Home } from "@mui/icons-material";
import useCustomNavigation from "../routes/useCustomNavigation";
import { Tooltip, Typography } from "@mui/material";
import { HomeButtonProps } from "../types/Buttons.interfaces";

const HomeButton = ({ isSmallScreen }: HomeButtonProps): JSX.Element => {
  const { postsPage } = useCustomNavigation();

  const handlePosts = () => {
    postsPage();
  };

  return (
    <IconButton
      size="large"
      aria-label="sign out"
      onClick={handlePosts}
      color="inherit"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[300],
        borderRadius: "8px",
        padding: "8px",
        "&:hover": {
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.grey[700]
              : theme.palette.grey[400],
          "& .MuiTypography-root": {
            color: (theme) => theme.palette.primary.main,
          },
          "& svg": {
            color: (theme) => theme.palette.primary.main,
          },
        },
      }}
    >
      {isSmallScreen ? (
        <Tooltip title={"Home"}>
          <Home />
        </Tooltip>
      ) : (
        <Typography sx={{ ml: 1.5, mr: 2 }}>HOME</Typography>
      )}
    </IconButton>
  );
};

export default HomeButton;

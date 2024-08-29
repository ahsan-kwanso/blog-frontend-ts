import React from "react";
import IconButton from "@mui/material/IconButton";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import useCustomNavigation from "../routes/useCustomNavigation";
import { Tooltip, Typography } from "@mui/material";

const LoginButton = ({ isSmallScreen }) => {
  const { loginPage } = useCustomNavigation();

  const handleLogin = () => {
    loginPage(); // Redirect to sign-in page after signing out
  };

  return (
    <IconButton
      size="large"
      aria-label="sign out"
      onClick={handleLogin}
      color="inherit"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px", // Padding inside the button
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[300],
        borderRadius: "8px",
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
        <Tooltip title={"Log in"}>
          <VpnKeyIcon />
        </Tooltip>
      ) : (
        <Typography sx={{ ml: 2, mr: 2 }}>Log in</Typography>
      )}
    </IconButton>
  );
};

export default LoginButton;

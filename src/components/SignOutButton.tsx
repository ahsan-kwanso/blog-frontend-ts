import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import ExitToApp from "@mui/icons-material/ExitToApp";
import { AuthContext } from "../contexts/AuthContext";
import useCustomNavigation from "../routes/useCustomNavigation";
import { Typography, Tooltip } from "@mui/material";
import { SignOutButtonProps } from "../types/Buttons.interfaces";

const SignOutButton = ({ isSmallScreen } : SignOutButtonProps) => {
  const { loginPage } = useCustomNavigation();
  const { signout } = useContext(AuthContext);

  const handleSignOut = () => {
    signout();
    loginPage(); // Redirect to sign-in page after signing out
  };

  return (
    <IconButton
      size="large"
      aria-label="sign out"
      onClick={handleSignOut}
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
            color: (theme) => theme.palette.secondary.main,
          },
          "& svg": {
            color: (theme) => theme.palette.secondary.main,
          },
        },
      }}
    >
      {isSmallScreen ? (
        <Tooltip title={"Sign out"}>
          <ExitToApp />
        </Tooltip>
      ) : (
        <Typography sx={{ ml: 2, mr: 2 }}>Sign Out</Typography>
      )}
    </IconButton>
  );
};

export default SignOutButton;

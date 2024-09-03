import React from "react";
import IconButton from "@mui/material/IconButton";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import useCustomNavigation from "../routes/useCustomNavigation";
import { Tooltip, Typography } from "@mui/material";
import { SignUpButtonProps } from "../types/Buttons.interfaces";

const SignUpButton = ({ isSmallScreen } : SignUpButtonProps) : JSX.Element => {
  const { signupPage } = useCustomNavigation();

  const handleSignUp = () => {
    signupPage();
  };

  return (
    <IconButton
      size="large"
      aria-label="sign out"
      onClick={handleSignUp}
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
        <Tooltip title={"Sign up"}>
          <HowToRegIcon />
        </Tooltip>
      ) : (
        <Typography sx={{ ml: 1.5, mr: 2 }}>Sign up</Typography>
      )}
    </IconButton>
  );
};

export default SignUpButton;

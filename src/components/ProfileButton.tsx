import React from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useCustomNavigation from "../routes/useCustomNavigation";

const ProfileButton = () => {
  const { profilePage } = useCustomNavigation();

  const handleClick = () => {
    profilePage(); //route to profile page
  };

  return (
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleClick}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
  );
};

export default ProfileButton;

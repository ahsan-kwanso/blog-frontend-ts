import React from "react";
import IconButton from "@mui/material/IconButton";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import useCustomNavigation from "../routes/useCustomNavigation";
import { Tooltip, Typography } from "@mui/material";
import { ManageButtonProps } from "../types/Buttons.interfaces";

const ManageButton = ({ isSmallScreen }: ManageButtonProps): JSX.Element => {
  const { manageUsersPage } = useCustomNavigation();

  const handleManage = () => {
    manageUsersPage();
  };

  return (
    <IconButton
      size="large"
      aria-label="sign out"
      onClick={handleManage}
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
        <Tooltip title={"Manage"}>
          <AdminPanelSettingsIcon />
        </Tooltip>
      ) : (
        <Typography sx={{ ml: 1.5, mr: 2 }}>Manage</Typography>
      )}
    </IconButton>
  );
};

export default ManageButton;

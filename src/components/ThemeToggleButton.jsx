import React from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const ThemeToggleButton = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Tooltip
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <WbSunnyIcon /> : <NightlightRoundIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;

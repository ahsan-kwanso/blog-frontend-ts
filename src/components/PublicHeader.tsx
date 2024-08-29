import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ThemeToggleButton from "./ThemeToggleButton";
import { useTheme } from "../contexts/ThemeContext";

// Custom Typography component for "Dribble"
const CustomTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 300,
  fontStyle: "italic",
  letterSpacing: "0.1em",
  fontSize: "2rem",
}));

const PrivateHeader = () => {
  const { toggleTheme } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            {/* <CustomTypography variant="h6" noWrap component="div"> */}
            <CustomTypography variant="h6" noWrap> 
              𝔇𝔯𝔦𝔟𝔟𝔩𝔢
            </CustomTypography>
          </Box>
          <Box>
            <ThemeToggleButton toggleTheme={toggleTheme} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PrivateHeader;

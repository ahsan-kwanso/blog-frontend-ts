import React from "react";
import { AppBar, Typography, styled } from "@mui/material";
import { lighten } from "@mui/material/styles";

const FooterContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.main, 0.1)
      : theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 300,
  fontStyle: "italic",
}));

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        width: "100%",
        marginTop: "10px",
      }}
    >
      <FooterText>© {currentYear} Dribble. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default React.memo(Footer);

import React from "react";
import { Container } from "@mui/material";
import PublicHeader from "../components/PublicHeader";

const PublicLayout = ({ children }) => {
  return (
    <div>
      <PublicHeader />
      <Container style={{ marginTop: "20px" }}>{children}</Container>
    </div>
  );
};

export default PublicLayout;

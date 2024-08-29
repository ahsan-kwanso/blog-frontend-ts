import React from "react";
import { Container } from "@mui/material";
import PrivateHeader from "../components/PrivateHeader";

const PrivateLayout = ({ children }) => {
  return (
    <div>
      <PrivateHeader />
      <Container style={{ marginTop: "20px" }}>{children}</Container>
    </div>
  );
};

export default PrivateLayout;

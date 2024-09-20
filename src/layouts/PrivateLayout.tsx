import React, { ReactNode } from "react";
import { Container } from "@mui/material";
import PrivateHeader from "../components/PrivateHeader";
import Sidebar from "../components/Sidebar";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps): JSX.Element => {
  return (
    <div>
      <PrivateHeader />
      <Container style={{ marginTop: "20px" }}>{children}</Container>
    </div>
  );
};

export default PrivateLayout;

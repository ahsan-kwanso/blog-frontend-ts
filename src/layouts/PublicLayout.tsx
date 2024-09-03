import React, {ReactNode} from "react";
import { Container } from "@mui/material";
import PublicHeader from "../components/PublicHeader";

interface PublicLayoutProps {
  children: ReactNode;
}


const PublicLayout = ({ children } : PublicLayoutProps) : JSX.Element => {
  return (
    <div>
      <PublicHeader />
      <Container style={{ marginTop: "20px" }}>{children}</Container>
    </div>
  );
};

export default PublicLayout;

import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import AppRoutes from "./routes/AppRoutes";
import "./utils/global.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <AppRoutes />
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;

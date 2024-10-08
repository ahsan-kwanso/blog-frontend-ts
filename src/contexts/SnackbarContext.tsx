import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, styled } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SnackbarContextType } from "../types/Contexts.interfaces";

const MySwal = withReactContent(Swal);

/// Create SnackbarContext with a default value
const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

// Styled Snackbar Component
const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiSnackbarContent-root": {
    borderRadius: "8px",
    boxShadow: `0px 4px 6px rgba(0, 0, 0, 0.1)`,
  },
  "& .MuiAlert-root": {
    fontSize: "0.875rem",
    fontWeight: "bold",
    padding: theme.spacing(1, 2),
    borderRadius: "8px",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

interface SnackProviderProps {
  children: ReactNode;
}
// SnackbarProvider Component
export const SnackbarProvider = ({
  children,
}: SnackProviderProps): JSX.Element => {
  const themeMode = localStorage.getItem("themeMode");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "info",
  });

  // Show Snackbar with styling
  const showSnackbar = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    const backgroundColor = themeMode === "dark" ? "#333" : "#fff"; // Dark or light theme
    const textColor = themeMode === "dark" ? "#fff" : "#000";
    MySwal.fire({
      title: message,
      icon: type, // 'success', 'error', 'warning', 'info'
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3250,
      timerProgressBar: true,
      customClass: {
        popup: "swal-toast",
      },
      didOpen: () => {
        // Add custom styling inline for the toast
        const toast = document.querySelector(".swal-toast");
        if (toast) {
          // Type assertion for element styling
          (toast as HTMLElement).style.backgroundColor = backgroundColor;
          (toast as HTMLElement).style.marginBottom = "70px"; // Adjust this value as needed
          (toast as HTMLElement).style.color = textColor; // Apply text color
        }
      },
    });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <StyledSnackbar
        open={snackbar.open}
        autoHideDuration={3250}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.type as "success" | "error" | "warning" | "info"}
        >
          {snackbar.message}
        </Alert>
      </StyledSnackbar>
    </SnackbarContext.Provider>
  );
};

// Custom Hook to use Snackbar Context
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

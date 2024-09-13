import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import { getToken } from "../utils/authUtils";
import PrivateLayout from "../layouts/PrivateLayout";
import { PAGE_URL } from "../utils/settings";
import { AuthContext } from "../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress"; // Material-UI spinner
import useCustomNavigation from "./useCustomNavigation";

const AuthorizedRoute = (): JSX.Element => {
  const token = getToken();
  const { showSnackbar } = useSnackbar();
  const { user, loading } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const { basePage } = useCustomNavigation();
  // State for managing the delay for the spinner
  const [delayComplete, setDelayComplete] = useState(false);

  useEffect(() => {
    if (!token) {
      showSnackbar("Please login first");
      basePage();
    }
  }, [token, showSnackbar]);

  // Add a 0.5-second delay before proceeding with the logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, 500);
    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && delayComplete) {
      if (token && !isAdmin) {
        showSnackbar("You don't have access to this page");
      } else if (!token) {
        showSnackbar("Please login first");
      }
    }
  }, [token, isAdmin, showSnackbar, loading, delayComplete]);

  // Show the spinner for the first 2 seconds, or if the auth context is still loading
  if (loading || !delayComplete) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  // After the 2-second delay and once loading is done, proceed with route checks
  if (!isAdmin) {
    return <Navigate to={PAGE_URL.posts} />;
  }
  if (!token) {
    return <Navigate to={PAGE_URL.base} />;
  }

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default AuthorizedRoute;

import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import PrivateLayout from "../layouts/PrivateLayout";
import { PAGE_URL } from "../utils/settings";
import { AuthContext } from "../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress"; // Material-UI spinner
import useCustomNavigation from "./useCustomNavigation";
import { useValidateRoute } from "../hooks/useValidateRoute";

const AuthorizedRoute = (): JSX.Element => {
  const { isAuthenticated, loading: loadingAuth } = useValidateRoute();
  const { showSnackbar } = useSnackbar();
  const { user, loading } = useContext(AuthContext);
  const isAdmin = user?.role.name === "admin";
  const { basePage } = useCustomNavigation();
  // State for managing the delay for the spinner
  const [delayComplete, setDelayComplete] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !loadingAuth) {
      showSnackbar("Please login first");
      basePage();
    }
  }, [isAuthenticated, showSnackbar]);

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
      if (isAuthenticated && !isAdmin) {
        showSnackbar("You don't have access to this page");
      } else if (!isAuthenticated) {
        showSnackbar("Please login first");
      }
    }
  }, [isAuthenticated, isAdmin, showSnackbar, loading, delayComplete]);

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
  if (!isAuthenticated) {
    return <Navigate to={PAGE_URL.base} />;
  }

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default AuthorizedRoute;

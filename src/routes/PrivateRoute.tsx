import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import PrivateLayout from "../layouts/PrivateLayout";
import { PAGE_URL } from "../utils/settings";
import { useValidateRoute } from "../hooks/useValidateRoute";

const PrivateRoute = (): JSX.Element => {
  const { isAuthenticated, loading } = useValidateRoute();
  const { showSnackbar } = useSnackbar();

  // Show snackbar if not authenticated and loading is complete
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      showSnackbar("Please login first");
    }
  }, [loading, isAuthenticated, showSnackbar]);

  if (loading) {
    return <CircularProgress sx={{ mt: 4 }} />; // Optional loading state
  }

  if (!isAuthenticated) {
    return <Navigate to={PAGE_URL.login} />;
  }

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};
export default PrivateRoute;

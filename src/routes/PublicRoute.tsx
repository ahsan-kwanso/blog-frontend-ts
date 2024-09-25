import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import PublicLayout from "../layouts/PublicLayout";
import { PAGE_URL } from "../utils/settings";
import { useValidateRoute } from "../hooks/useValidateRoute";

const PublicRoute = (): JSX.Element => {
  const { isAuthenticated, loading } = useValidateRoute();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      showSnackbar("Already logged in!");
    }
  }, [loading, isAuthenticated, showSnackbar]);

  if (isAuthenticated) {
    return <Navigate to={PAGE_URL.posts} />;
  }
  if (loading) {
    return <CircularProgress sx={{ mt: 4 }} />; // Optional loading state
  }

  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default PublicRoute;

import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import { getToken } from "../utils/authUtils";
import PublicLayout from "../layouts/PublicLayout";
import { PAGE_URL } from "../utils/settings";

const PublicRoute = (): JSX.Element => {
  const token = getToken();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (token) {
      showSnackbar("Already logged in!");
    }
  }, [token, showSnackbar]);

  if (token) {
    return <Navigate to={PAGE_URL.posts} />;
  }

  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default PublicRoute;

import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import { getToken } from "../utils/authUtils";
import PrivateLayout from "../layouts/PrivateLayout";
import { PAGE_URL } from "../utils/settings";

const PrivateRoute = (): JSX.Element => {
  const token = getToken();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (!token) {
      showSnackbar("Please login first");
    }
  }, [token, showSnackbar]);

  if (!token) {
    return <Navigate to={PAGE_URL.base} />;
  }

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default PrivateRoute;

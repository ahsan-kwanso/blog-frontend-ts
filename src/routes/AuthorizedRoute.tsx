import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import { getToken } from "../utils/authUtils";
import PrivateLayout from "../layouts/PrivateLayout";
import { PAGE_URL } from "../utils/settings";
import { AuthContext } from "../contexts/AuthContext";

const AuthorizedRoute = (): JSX.Element => {
  const token = getToken();
  const { showSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  useEffect(() => {
    if (token && !isAdmin) {
      showSnackbar("You don't have access to this page");
    } else if (!token) {
      showSnackbar("Please login first");
    }
  }, [token, isAdmin, showSnackbar]);

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

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Footer from "../components/Footer";
import { PAGE_URL } from "../utils/settings";
import NotFound from "../pages/NotFound";

// Lazy load the pages
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const CreatePost = lazy(() => import("../pages/CreatePost"));
const Posts = lazy(() => import("../pages/Posts"));
const EditPost = lazy(() => import("../pages/EditPost"));
const Profile = lazy(() => import("../pages/Profile"));
const PostView = lazy(() => import("../pages/PostView"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={PAGE_URL.login} element={<Login />} />
            <Route path={PAGE_URL.signup} element={<Signup />} />
            <Route path={PAGE_URL.base} element={<Posts />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={PAGE_URL.createPost} element={<CreatePost />} />
            <Route path={PAGE_URL.editPost} element={<EditPost />} />
            <Route path={PAGE_URL.profile} element={<Profile />} />
            <Route path={PAGE_URL.posts} element={<Posts />} />
            <Route path={PAGE_URL.viewPost} element={<PostView />} />
          </Route>
          {/* Other routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default AppRoutes;

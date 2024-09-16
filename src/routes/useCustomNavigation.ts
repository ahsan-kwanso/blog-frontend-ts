import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "../utils/settings";

type Params = Record<string, string | number>;
const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (url: string, params: Params = {}) => {
    let finalUrl = url;
    for (const [key, value] of Object.entries(params)) {
      finalUrl = finalUrl.replace(`:${key}`, String(value));
    }
    navigate(finalUrl);
  };

  return {
    viewPostPage: (postId: string | number) =>
      navigateTo(PAGE_URL.viewPost, { postId }),
    editPostPage: (postId: string | number) =>
      navigateTo(PAGE_URL.editPost, { postId }),
    createPostPage: () => navigate(PAGE_URL.createPost),
    profilePage: () => navigate(PAGE_URL.profile),
    loginPage: () => navigate(PAGE_URL.login),
    signupPage: () => navigate(PAGE_URL.signup),
    myPostsPage: () => navigate(`${PAGE_URL.posts}?filter=my-posts`),
    postsPage: () => navigate(PAGE_URL.posts),
    basePage: () => navigate(PAGE_URL.base),
    manageUsersPage: () => navigate(PAGE_URL.manageUsers),
    CodeVerificationPage: () => navigate(PAGE_URL.codeVerification),
  };
};

export default useCustomNavigation;

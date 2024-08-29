import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "../utils/settings";

const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (url, params = {}) => {
    let finalUrl = url;
    for (const [key, value] of Object.entries(params)) {
      finalUrl = finalUrl.replace(`:${key}`, value);
    }
    navigate(finalUrl);
  };

  return {
    viewPostPage: (postId) => navigateTo(PAGE_URL.viewPost, { postId }),
    editPostPage: (postId) => navigateTo(PAGE_URL.editPost, { postId }),
    createPostPage: () => navigate(PAGE_URL.createPost),
    profilePage: () => navigate(PAGE_URL.profile),
    loginPage: () => navigate(PAGE_URL.login),
    signupPage: () => navigate(PAGE_URL.signup),
    myPostsPage: () => navigate(`${PAGE_URL.posts}?filter=my-posts`),
    postsPage: () => navigate(PAGE_URL.posts),
  };
};

export default useCustomNavigation;

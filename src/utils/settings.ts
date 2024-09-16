export const backend_url = process.env.REACT_APP_BACKEND_URL;
export const API_URL = {
  post: `/posts`,
  comment: `/comments`,
  searchPosts: `/posts/search`,
  me: `/users/me`,
  signup: `/auth/signup`,
  signin: `/auth/signin`,
  users: `users`,
  verifyEmail: `/auth/verify-email`,
};

export const PAGE_URL = {
  base: `/`,
  login: `/login`,
  signup: `/signup`,
  posts: `/posts`,
  createPost: `/posts/create-post`,
  editPost: `/posts/edit-post/:postId`,
  profile: `/profile`,
  viewPost: `/posts/:postId`,
  manageUsers: `/manage-users`,
  codeVerification: `/verify-email`,
};

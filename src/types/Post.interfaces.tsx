export interface PostBase {
  id: number;
  title: string;
  content: string;
  date: string;
  author?: string; // Optional if not always needed
  image?: string; // Optional if image might not be present
}

export interface PostProps extends PostBase {
  id: number;
  showEdit?: boolean;
  showDelete?: boolean;
}

export interface PostDetailType extends PostBase {
  createdAt: string;
}

export interface PostDetailsProps {
  post: PostDetailType;
  onReplySubmit: () => void;
}

export interface PostListProps {
  posts: PostBase[];
  isLoading: boolean;
  showEdit: boolean;
  showDelete: boolean;
}

export interface NoPostsMessageProps {
  isLoading: boolean;
  posts: PostBase[];
}

export interface PostData {
  title: string;
  content: string;
}

export interface EditPostData {
  title?: string;
  content?: string;
}

export interface Post extends PostBase {
  UserId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostWithAuthor extends PostBase {
  author: string; // Ensuring author is required here
}

export interface FetchPostsResponse {
  total: number;
  page: number;
  pageSize: number;
  nextPage: string | null;
  posts: PostWithAuthor[];
}

export interface UseCreatePostReturn {
  createPost: (data: PostData) => Promise<Post>;
  isCreating: boolean;
  error: string | null;
  success: string | null;
}

export type OnSuccessCallback = () => void;
export interface UseDeletePostReturn {
  deletePost: (postId: number, onSuccess: OnSuccessCallback) => Promise<void>;
  isDeleting: boolean;
  error: string | null;
}

export type DeletePostResponse = {
  message: string;
};

export interface UseEditPostReturn {
  editPost: (postId: number, postData: EditPostData) => Promise<Post>;
  loading: boolean;
  error: string | null;
  success: string | null;
}

export interface UseFetchPostByIdReturn {
  post: Post | undefined;
  isLoading: boolean;
  error: string | null;
}

export interface UseFetchPostsReturn {
  posts: PostWithAuthor[];
  total: number;
  nextPage: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseFetchSearchPostsReturn extends UseFetchPostsReturn {}

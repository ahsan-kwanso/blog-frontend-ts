export interface BaseComment {
  id: number;
  title: string;
  content: string;
  UserId: number;
  PostId: number;
  ParentCommentId: number | null; // for previous versions use ParentId, for ts express backend
  createdAt: string;
  updatedAt: string;
  subComments: BaseComment[];
}

export interface Comment extends BaseComment {}

export interface CommentProps {
  comment: BaseComment; // Use BaseComment to avoid repetition
  onReplySubmit: () => void;
}

// Props for the comment section component
export interface CommentSectionProps {
  comments: BaseComment[] | null; // Use BaseComment[] for comments array
  onReplySubmit: () => void;
}

// Props for the reply form component
export interface ReplyFormProps {
  postId: number;
  parentCommentId?: number | null;
  onClose: () => void;
}

// Data structure for creating a comment
export interface CreateCommentData {
  PostId: number;
  content?: string;
  ParentCommentId?: number | null;
}

export interface UseCreateCommentReturn {
  createComment: (data: CreateCommentData) => Promise<Comment>;
  error: string | null;
  success: string | null;
}

export interface UseDeleteCommentReturn {
  deleteComment: (commentId: number) => Promise<boolean>;
  error: string | null;
  success: string | null;
}

export interface UseFetchCommentsByPostIdReturn {
  comments: Comment[] | null;
  isLoading: boolean;
  error: string | null;
}

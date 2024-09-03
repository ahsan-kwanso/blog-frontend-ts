export interface BaseComment {
  id: number;
  title: string;
  content: string;
  UserId: number;
  PostId: number;
  ParentId: number | null;
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
  parentId?: number | null;
  onClose: () => void;
}

// Data structure for creating a comment
export interface CreateCommentData {
  PostId: number;
  content?: string;
  ParentId?: number | null;
}

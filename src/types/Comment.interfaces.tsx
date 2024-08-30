interface SubComment {
    id: number;
    title: string;
    content: string;
    UserId: number;
    PostId: number;
    ParentId: number | null;
    createdAt: string;
    updatedAt: string;
    subComments: SubComment[];
  }
  
 export interface CommentProps {
    comment: SubComment;
    onReplySubmit: () => void;
  }

 export interface CommentSectionProps {
    comments: SubComment[] | null; // Make sure to use the type you defined earlier
    onReplySubmit: () => void;
  }


  export interface ReplyFormProps {
    postId: number;
    parentId?: number | null;
    onClose: () => void;
  }

  export interface CreateCommentData {
    PostId : number;
    content? : string;
    ParentId? : number | null;
  }
  
  export interface Comment extends SubComment {
    subComments: SubComment[]; // Top-level comments also have sub-comments
  }
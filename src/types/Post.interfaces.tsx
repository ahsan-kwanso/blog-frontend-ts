export interface NoPostsMessageProps {
    isLoading: boolean;
    posts: any[]; // You can specify a more precise type if you have one
  }

 export interface PostProps {
    postId: number;
    author: string;
    image?: string;
    title: string;
    content: string;
    date: string;
    showEdit?: boolean;
    showDelete?: boolean;
  }

  interface PostDetailType {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  }
  

  // Define props interface for PostDetails component
 export interface PostDetailsProps {
    post: PostDetailType;
    onReplySubmit: () => void;
  }

  interface PostType {
    id: number;
    author: string;
    title: string;
    content: string;
    date: string;
    image?: string; // Optional if image might not be present
  }
  
  // Define props interface for PostList component
  export interface PostListProps {
    posts: PostType[];
    isLoading: boolean;
    showEdit: boolean;
    showDelete: boolean;
  }

  export interface PostData {
    title: string;
    content: string;
  }

  export interface EditPostData {
    title?: string;
    content?: string;
  }
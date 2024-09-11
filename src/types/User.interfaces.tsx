// User.interfaces.ts

export interface UserWithNumberOfPosts {
  id: number;
  name: string;
  email: string;
  role: string;
  posts: number;
}

export interface UseFetchUsersReturn {
  users: UserWithNumberOfPosts[];
  isLoading: boolean;
  error: any; // Adjust type as needed
}

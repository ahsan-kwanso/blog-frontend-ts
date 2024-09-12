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
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export interface UserEditRoleReturn {
  editUserRole: (userId: number, role: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

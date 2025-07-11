export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: number;
  featuredImage: string;
  title: string;
  synopsis: string;
  content: string;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface CreateBlogRequest {
  featuredImage: string;
  title: string;
  synopsis: string;
  content: string;
}

export interface UpdateBlogRequest extends CreateBlogRequest {
  id: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ApiError {
  message: string;
  status: number;
}

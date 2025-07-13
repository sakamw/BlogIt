import type { Blog, CreateBlogRequest } from "../types/types";
import axiosInstance from "../api/axios";

export const fetchBlogs = async (search?: string): Promise<Blog[]> => {
  const url = search ? `/blogs?search=${encodeURIComponent(search)}` : `/blogs`;
  const res = await axiosInstance.get(url);
  return res.data;
};

export const fetchBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const res = await axiosInstance.get(`/blogs/${id}`);
    return res.data;
  } catch {
    return null;
  }
};

export const createBlog = async (data: CreateBlogRequest): Promise<Blog> => {
  const res = await axiosInstance.post(`/blogs`, data);
  return res.data;
};

export const updateUserAvatar = async (avatarUrl: string) => {
  const res = await axiosInstance.patch(`/users/avatar-url`, {
    avatar: avatarUrl,
  });
  return res.data;
};

export const updateUserInfo = async (data: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}) => {
  const res = await axiosInstance.patch(`/users/`, data);
  return res.data;
};

export const updateUserPassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await axiosInstance.patch(`/users/password`, data);
  return res.data;
};

export const deactivateUser = async () => {
  const res = await axiosInstance.patch(`/users/deactivate`, {});
  return res.data;
};

export const deleteBlog = async (blogId: number) => {
  const res = await axiosInstance.delete(`/blogs/${blogId}`);
  return res.data;
};

export const softDeleteBlog = async (blogId: number) => {
  const res = await axiosInstance.patch(`/blogs/${blogId}`, {
    isDeleted: true,
  });
  return res.data;
};

export const fetchTrashedBlogs = async (): Promise<Blog[]> => {
  const res = await axiosInstance.get(`/users/blogs?trashed=true`);
  return res.data;
};

export const restoreBlog = async (blogId: number) => {
  const res = await axiosInstance.patch(`/blogs/${blogId}`, {
    isDeleted: false,
  });
  return res.data;
};

export const permanentlyDeleteBlog = async (blogId: number) => {
  const res = await axiosInstance.delete(`/blogs/${blogId}`);
  return res.data;
};

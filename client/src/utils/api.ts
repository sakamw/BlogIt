import axios from "axios";
import type { Blog } from "../types/types";
import type { CreateBlogRequest } from "../types/types";

const API_BASE = "http://localhost:3500/api";

export const fetchBlogs = async (search?: string): Promise<Blog[]> => {
  const url = search
    ? `${API_BASE}/blogs?search=${encodeURIComponent(search)}`
    : `${API_BASE}/blogs`;
  const res = await axios.get(url, { withCredentials: true });
  return res.data;
};

export const fetchBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const res = await axios.get(`${API_BASE}/blogs/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
};

export const createBlog = async (data: CreateBlogRequest): Promise<Blog> => {
  const res = await axios.post(`${API_BASE}/blogs`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const updateUserAvatar = async (avatarUrl: string) => {
  const res = await axios.patch(
    `${API_BASE}/users/avatar-url`,
    { avatar: avatarUrl },
    { withCredentials: true }
  );
  return res.data;
};

export const updateUserInfo = async (data: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}) => {
  const res = await axios.patch(`${API_BASE}/users/`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const updateUserPassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await axios.patch(`${API_BASE}/users/password`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteBlog = async (blogId: number) => {
  const res = await axios.delete(`${API_BASE}/blogs/${blogId}`, {
    withCredentials: true,
  });
  return res.data;
};

import axios from "axios";
import type { Blog } from "../types/types";
import type { CreateBlogRequest } from "../types/types";

const API_BASE = "http://localhost:3500/api";

export const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await axios.get(`${API_BASE}/blogs`, { withCredentials: true });
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

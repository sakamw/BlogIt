import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Blog } from "../types/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  userBlogs: Blog[];
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  loginUser: (user: User, token: string) => void;
  logoutUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

interface BlogActions {
  setBlogs: (blogs: Blog[]) => void;
  setBlog: (blog: Blog | null) => void;
  addBlog: (blog: Blog) => void;
  updateBlog: (blog: Blog) => void;
  deleteBlog: (blogId: number) => void;
  setUserBlogs: (blogs: Blog[]) => void;
  setBlogLoading: (loading: boolean) => void;
  setBlogError: (error: string | null) => void;
  clearBlogError: () => void;
}

type StoreState = AuthState & BlogState & AuthActions & BlogActions;

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      blogs: [],
      currentBlog: null,
      userBlogs: [],

      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      loginUser: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          error: null,
        }),
      logoutUser: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          userBlogs: [],
          error: null,
        }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      setBlogs: (blogs) => set({ blogs }),
      setBlog: (currentBlog) => set({ currentBlog }),
      addBlog: (blog) =>
        set((state) => ({
          blogs: [blog, ...state.blogs],
          userBlogs:
            state.user?.id === blog.author.id
              ? [blog, ...state.userBlogs]
              : state.userBlogs,
        })),
      updateBlog: (updatedBlog) =>
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id === updatedBlog.id ? updatedBlog : blog
          ),
          userBlogs: state.userBlogs.map((blog) =>
            blog.id === updatedBlog.id ? updatedBlog : blog
          ),
          currentBlog:
            state.currentBlog?.id === updatedBlog.id
              ? updatedBlog
              : state.currentBlog,
        })),
      deleteBlog: (blogId) =>
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== blogId),
          userBlogs: state.userBlogs.filter((blog) => blog.id !== blogId),
          currentBlog:
            state.currentBlog?.id === blogId ? null : state.currentBlog,
        })),
      setUserBlogs: (userBlogs) => set({ userBlogs }),
      setBlogLoading: (isLoading) => set({ isLoading }),
      setBlogError: (error) => set({ error }),
      clearBlogError: () => set({ error: null }),
    }),
    {
      name: "blogit-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useStore;

export const useAuth = () =>
  useStore((state) => ({
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    loginUser: state.loginUser,
    logoutUser: state.logoutUser,
    setLoading: state.setLoading,
    setError: state.setError,
    clearError: state.clearError,
  }));

export const useBlogs = () =>
  useStore((state) => ({
    blogs: state.blogs,
    currentBlog: state.currentBlog,
    userBlogs: state.userBlogs,
    isLoading: state.isLoading,
    error: state.error,
    setBlogs: state.setBlogs,
    setBlog: state.setBlog,
    addBlog: state.addBlog,
    updateBlog: state.updateBlog,
    deleteBlog: state.deleteBlog,
    setUserBlogs: state.setUserBlogs,
    setBlogLoading: state.setBlogLoading,
    setBlogError: state.setBlogError,
    clearBlogError: state.clearBlogError,
  }));

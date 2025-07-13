import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Header from "./components/common/Header";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import BlogsPage from "./pages/blogs/BlogsPage";
import Sidebar from "./components/common/Sidebar";
import BlogDetails from "./pages/blogs/BlogDetails";
import CreateBlog from "./pages/blogs/CreateBlog";
import EditBlog from "./pages/blogs/EditBlog";
import EditBlogs from "./pages/blogs/EditBlogs";
import ProfilePage from "./pages/profile/ProfilePage";
import Logout from "./pages/auth/Logout";
import NotFound from "./pages/NotFound";
import { useAuth } from "./store/useStore";
import DraftsPage from "./pages/blogs/DraftsPage";
import axiosInstance from "./api/axios";
import TrashPage from "./pages/blogs/TrashPage";

const client = new QueryClient();

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#388d80",
      dark: "#2e7267",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e6f4f1",
      contrastText: "#222",
    },
    background: {
      default: "#fff",
      paper: "#e6f4f1",
    },
    text: {
      primary: "#222",
      secondary: "#555",
    },
    cardBackground: "#FAFAFA",
    cardBorder: "#E0E0E0",
    cardShadow: "0 .2rem .8rem rgba(0,0,0,0.05)",
  },
  shape: {
    borderRadius: 8,
  },
});

const App = () => {
  const { isAuthenticated, setUser, logoutUser, setLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        console.log("Frontend - fetching current user");
        setLoading(true);
        const res = await axiosInstance.get("/users/current", {
          withCredentials: true,
        });
        console.log("Frontend - current user response:", res.data);
        setUser(res.data);
      } catch (error) {
        console.log("Frontend - current user error:", error);
        logoutUser();
      }
    };
    fetchCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={client}>
        <Router>
          {isAuthenticated && (
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          )}
          <Header onSidebarToggle={() => setSidebarOpen((open) => !open)} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/blogs"
              element={
                <ProtectedRoute>
                  <BlogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/create"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/:blogId"
              element={
                <ProtectedRoute>
                  <BlogDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/:blogId/edit"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/drafts"
              element={
                <ProtectedRoute>
                  <DraftsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/editblogs"
              element={
                <ProtectedRoute>
                  <EditBlogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/trash"
              element={
                <ProtectedRoute>
                  <TrashPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

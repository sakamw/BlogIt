import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Header from "./components/common/Header";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import EditBlog from "./pages/EditBlog";
import BlogsPage from "./pages/blogs/BlogsPage";
import CreateBlog from "./pages/blogs/CreateBlog";
import BlogDetails from "./pages/blogs/BlogDetails";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFound from "./pages/NotFound";

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
  },
  shape: {
    borderRadius: 8,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={client}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/create" element={<CreateBlog />} />
            <Route path="/blogs/:blogId" element={<BlogDetails />} />
            <Route path="/blogs/:blogId/edit" element={<EditBlog />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

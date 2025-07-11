import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Header from "./components/common/Header";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import EditBlog from "./pages/blogs/EditBlog";

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
            <Route path="/blogs/:blogId/edit" element={<EditBlog />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

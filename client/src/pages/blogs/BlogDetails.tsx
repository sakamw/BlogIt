import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Container,
  Alert,
  Paper,
  Button,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactMarkdown from "react-markdown";
import { fetchBlogById } from "../../utils/api";
import type { Blog } from "../../types/types";

const BlogDetails = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError("");
      const data = await fetchBlogById(blogId!);
      if (!data || data.isDeleted) {
        setError("Blog not found.");
        setBlog(null);
      } else {
        setBlog(data);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || "Blog not found."}</Alert>
      </Container>
    );
  }

  const getInitials = (first?: string, last?: string) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => navigate("/blogs")}
      >
        Back to Blogs
      </Button>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          maxWidth: 800,
          mx: "auto",
          background: theme.palette.cardBackground,
          border: `1px solid ${theme.palette.cardBorder}`,
          boxShadow: theme.palette.cardShadow,
        }}
      >
        {blog.featuredImage && (
          <Box mb={2}>
            <img
              src={blog.featuredImage}
              alt={blog.title}
              style={{
                width: "100%",
                borderRadius: 12,
                maxHeight: 400,
                objectFit: "cover",
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
              }}
            />
          </Box>
        )}
        <Typography variant="h3" fontWeight={700} gutterBottom sx={{ mb: 1 }}>
          {blog.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {blog.synopsis}
        </Typography>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          {blog.author.avatar ? (
            <Avatar
              src={blog.author.avatar}
              alt={`${blog.author.firstName} ${blog.author.lastName}`}
              sx={{ width: 48, height: 48, boxShadow: 2 }}
            />
          ) : (
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: "primary.main",
                fontWeight: 700,
                fontSize: 20,
                boxShadow: 2,
              }}
            >
              {getInitials(blog.author.firstName, blog.author.lastName)}
            </Avatar>
          )}
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {blog.author.firstName} {blog.author.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(blog.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Box mt={2} sx={{ fontSize: 18, lineHeight: 1.7 }}>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogDetails;

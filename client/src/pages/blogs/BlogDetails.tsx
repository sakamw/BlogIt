import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Container,
  Alert,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { fetchBlogById } from "../../utils/api";
import type { Blog } from "../../types/types";

const BlogDetails = () => {
  const { blogId } = useParams();
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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box mb={3}>
        {blog.featuredImage && (
          <Box mb={2}>
            <img
              src={blog.featuredImage}
              alt={blog.title}
              style={{
                width: "100%",
                borderRadius: 8,
                maxHeight: 400,
                objectFit: "cover",
              }}
            />
          </Box>
        )}
        <Typography variant="h3" fontWeight={700} gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {blog.synopsis}
        </Typography>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar>
            {blog.author.firstName[0]}
            {blog.author.lastName[0]}
          </Avatar>
          <Typography variant="body1">
            {blog.author.firstName} {blog.author.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(blog.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Box mt={4}>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogDetails;

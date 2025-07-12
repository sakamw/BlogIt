import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import type { Blog } from "../../types/types";

const EditBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get("/users/blogs");
        setBlogs(res.data);
      } catch {
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Box maxWidth={900} mx="auto" mt={6}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Edit Your Blogs
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : blogs.length === 0 ? (
        <Typography color="text.secondary">
          You have not created any blogs yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {blogs.map((blog) => (
            <Paper
              key={blog.id}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {blog.featuredImage && (
                  <Avatar
                    variant="rounded"
                    src={blog.featuredImage}
                    alt={blog.title}
                    sx={{ width: 64, height: 64, mr: 2 }}
                  />
                )}
                <Box>
                  <Typography variant="h6">{blog.title}</Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    {blog.synopsis}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                onClick={() => navigate(`/blogs/${blog.id}/edit`)}
              >
                Edit
              </Button>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default EditBlogs;

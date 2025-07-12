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
import {
  fetchTrashedBlogs,
  restoreBlog,
  permanentlyDeleteBlog,
} from "../../utils/api";
import type { Blog } from "../../types/types";

const TrashPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTrashedBlogs();
        setBlogs(data);
      } catch {
        setError("Failed to load trashed blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRestore = async (blogId: number) => {
    try {
      await restoreBlog(blogId);
      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
    } catch {
      alert("Failed to restore blog.");
    }
  };

  const handleDelete = async (blogId: number) => {
    if (
      window.confirm("Permanently delete this blog? This cannot be undone.")
    ) {
      try {
        await permanentlyDeleteBlog(blogId);
        setBlogs((prev) => prev.filter((b) => b.id !== blogId));
      } catch {
        alert("Failed to delete blog.");
      }
    }
  };

  return (
    <Box maxWidth={900} mx="auto" mt={6}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Trash
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : blogs.length === 0 ? (
        <Typography color="text.secondary">No blogs in trash.</Typography>
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
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleRestore(blog.id)}
                >
                  Restore
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete Permanently
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TrashPage;

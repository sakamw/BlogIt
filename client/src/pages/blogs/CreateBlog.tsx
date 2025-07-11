import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Alert,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createBlog } from "../../utils/api";
import { useBlogs } from "../../store/useStore";
import type { CreateBlogRequest } from "../../types/types";
import type { AxiosError } from "axios";

const CreateBlog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addBlog } = useBlogs();

  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    content: "",
    featuredImage: "",
  });

  const [error, setError] = useState("");

  const createBlogMutation = useMutation({
    mutationFn: (data: CreateBlogRequest) => createBlog(data),
    onSuccess: (newBlog) => {
      addBlog(newBlog);
      navigate("/blogs");
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "isAxiosError" in error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        setError(axiosError.response?.data?.message || "Failed to create blog");
      } else {
        setError("Failed to create blog");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.synopsis || !formData.content) {
      setError("Please fill in all required fields");
      return;
    }

    createBlogMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
          color={theme.palette.text.primary}
          mb={3}
          textAlign="center"
        >
          Create New Blog
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Featured Image URL"
            name="featuredImage"
            value={formData.featuredImage}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="https://example.com/image.jpg"
            helperText="Enter a URL for your blog's featured image"
          />

          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            placeholder="Enter your blog title"
          />

          <TextField
            label="Synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={3}
            placeholder="Write a brief synopsis of your blog"
            helperText="This will be displayed on the blog card"
          />

          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={12}
            placeholder="Write your blog content here using Markdown..."
            helperText="You can use Markdown syntax for formatting"
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={createBlogMutation.isPending}
              sx={{
                flex: 1,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              {createBlogMutation.isPending ? "Creating..." : "Create Blog"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={() => navigate("/blogs")}
              sx={{
                flex: 1,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateBlog;

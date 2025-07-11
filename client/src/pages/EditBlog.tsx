import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

interface Blog {
  id: number;
  title: string;
  synopsis: string;
  content: string;
  featuredImage: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState<Partial<Blog>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/api/blogs/${blogId}`
        );
        setForm(res.data);
        setPreview(
          res.data.featuredImage
            ? `http://localhost:3500${res.data.featuredImage}`
            : null
        );
      } catch {
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else if (form.featuredImage) {
      setPreview(`http://localhost:3500${form.featuredImage}`);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title || "");
      formData.append("synopsis", form.synopsis || "");
      formData.append("content", form.content || "");
      if (imageFile) {
        formData.append("featuredImage", imageFile);
      }
      await axios.patch(`http://localhost:3500/api/blogs/${blogId}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Blog updated successfully!");
      setTimeout(() => navigate(`/blogs/${blogId}`), 1200);
    } catch {
      setError("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box
      maxWidth={900}
      mx="auto"
      mt={6}
      bgcolor={theme.palette.background.paper}
      p={4}
      borderRadius={4}
      boxShadow="0 4px 24px rgba(0,0,0,0.10)"
    >
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
        color={theme.palette.text.primary}
      >
        Edit Blog
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack spacing={3}>
          {success && <Typography color="success.main">{success}</Typography>}
          {error && <Typography color="error.main">{error}</Typography>}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: 8 }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: 180, borderRadius: 8, marginTop: 8 }}
            />
          )}
          <TextField
            label="Title"
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Synopsis"
            name="synopsis"
            value={form.synopsis || ""}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Content (Markdown)"
            name="content"
            value={form.content || ""}
            onChange={handleChange}
            fullWidth
            required
            multiline
            minRows={8}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<MailOutlineIcon />}
            sx={{
              fontWeight: 600,
              fontSize: 16,
              borderRadius: 2,
              py: 1.5,
              width: 180,
              background: theme.palette.primary.main,
              "&:hover": { background: theme.palette.primary.dark },
            }}
            disabled={loading}
          >
            Publish
          </Button>
        </Stack>
      </form>
      <Box mt={6}>
        <Typography
          variant="h5"
          fontWeight={600}
          mb={2}
          color={theme.palette.text.primary}
        >
          Preview
        </Typography>
        <Box
          p={3}
          bgcolor={theme.palette.background.default}
          borderRadius={2}
          minHeight={120}
        >
          <ReactMarkdown>
            {form.content || "Nothing to preview yet..."}
          </ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
};

export default EditBlog;

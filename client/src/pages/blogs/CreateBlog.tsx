import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  useTheme,
  CircularProgress,
  Input,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { uploadImageToCloudinary } from "../../utils/uploads";
import axiosInstance from "../../api/axios";

const DRAFT_KEY = "blogit-draft";

const CreateBlog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        setTitle(draft.title || "");
        setSynopsis(draft.synopsis || "");
        setContent(draft.content || "");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let imageUrl = "";
      if (featuredImage) {
        imageUrl = await uploadImageToCloudinary(featuredImage);
      }

      const response = await axiosInstance.post("/blogs", {
        title,
        synopsis,
        content,
        featuredImage: imageUrl,
      });

      localStorage.removeItem(DRAFT_KEY);
      navigate(`/blogs/${response.data.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (title || synopsis || content || featuredImage) {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ title, synopsis, content })
      );
    }
    navigate("/blogs/drafts");
  };

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
      <Box mb={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back
        </Button>
      </Box>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
        color={theme.palette.text.primary}
      >
        Create New Blog
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          <Box>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleImageChange}
              sx={{ display: "none" }}
              id="featured-image-upload"
            />
            <label htmlFor="featured-image-upload">
              <Button variant="outlined" component="span" sx={{ mb: 2 }}>
                Upload Featured Image
              </Button>
            </label>
            {preview && (
              <Box mt={2}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 300,
                    borderRadius: 8,
                  }}
                />
              </Box>
            )}
          </Box>

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            fullWidth
            required
            multiline
            rows={3}
          />

          <TextField
            label="Content (Markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            required
            multiline
            rows={10}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              startIcon={
                loading ? <CircularProgress size={20} /> : <PublishIcon />
              }
              disabled={loading}
              sx={{
                width: 200,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Publish Blog
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateBlog;

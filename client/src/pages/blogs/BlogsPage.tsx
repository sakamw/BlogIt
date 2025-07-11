import { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Add as AddIcon } from "@mui/icons-material";
import BlogCard from "../../components/blog/BlogCard";
import { fetchBlogs } from "../../utils/api";
import { useBlogs } from "../../store/useStore";

const BlogsPage = () => {
  const theme = useTheme();
  const { blogs, setBlogs } = useBlogs();

  const {
    data: fetchedBlogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  useEffect(() => {
    if (fetchedBlogs) {
      setBlogs(fetchedBlogs);
    }
  }, [fetchedBlogs, setBlogs]);

  if (isLoading) {
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load blogs. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h3"
          component="h1"
          fontWeight={700}
          color={theme.palette.text.primary}
        >
          All Blogs
        </Typography>
        <Button
          component={Link}
          to="/blogs/create"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: theme.palette.primary.main,
            color: "white",
            px: 3,
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              background: theme.palette.primary.dark,
            },
          }}
        >
          Create New Blog
        </Button>
      </Box>

      {blogs.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="40vh"
          textAlign="center"
        >
          <Typography
            variant="h5"
            color="text.secondary"
            gutterBottom
            fontWeight={600}
          >
            No blogs found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Be the first to create a blog post!
          </Typography>
          <Button
            component={Link}
            to="/blogs/create"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: theme.palette.primary.main,
              color: "white",
              px: 3,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                background: theme.palette.primary.dark,
              },
            }}
          >
            Create Your First Blog
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BlogsPage;

import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "../../components/blog/BlogCard";
import { fetchBlogs } from "../../utils/api";
import { useSearchParams } from "react-router-dom";

const BlogsPage = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || undefined;

  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", search],
    queryFn: () => fetchBlogs(search),
  });

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
          Recent Blogs
        </Typography>
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
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={4} justifyContent="flex-start">
          {blogs.map((blog) => (
            <Box key={blog.id} width={{ xs: "100%", sm: "47%", md: "30%" }}>
              <BlogCard blog={blog} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default BlogsPage;

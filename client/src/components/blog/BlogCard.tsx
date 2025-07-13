import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Blog } from "../../types/types";

interface BlogCardProps {
  blog: Blog;
  showActions?: boolean;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blog: Blog) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  showActions = false,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        background: theme.palette.cardBackground,
        border: `1px solid ${theme.palette.cardBorder}`,
        boxShadow: theme.palette.cardShadow,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-.4rem)",
          boxShadow: theme.palette.cardShadow,
        },
        p: { xs: 1, sm: 0 },
        m: { xs: 0, sm: 0 },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={blog.featuredImage}
        alt={blog.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          component="h2"
          fontWeight={700}
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          {blog.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.5,
          }}
        >
          {blog.synopsis}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            {blog.author.avatar ? (
              <Avatar
                src={blog.author.avatar}
                alt={blog.author.firstName}
                sx={{ width: 32, height: 32, mr: 1 }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  mr: 1,
                  bgcolor: theme.palette.primary.main,
                  fontSize: "0.875rem",
                }}
              >
                {getInitials(blog.author.firstName, blog.author.lastName)}
              </Avatar>
            )}
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {blog.author.firstName} {blog.author.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(blog.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            component={Link}
            to={`/blogs/${blog.id}`}
            variant="outlined"
            size="small"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
              },
            }}
          >
            Read More
          </Button>

          {showActions && (
            <Box>
              <Button
                onClick={() => onEdit?.(blog)}
                size="small"
                sx={{
                  textTransform: "none",
                  mr: 1,
                  color: theme.palette.secondary.main,
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => onDelete?.(blog)}
                size="small"
                color="error"
                sx={{ textTransform: "none" }}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

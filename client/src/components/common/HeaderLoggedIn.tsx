import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  useTheme,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRef, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import { useAuth } from "../../store/useStore";
import { uploadImageToCloudinary } from "../../utils/uploads";
import { updateUserAvatar } from "../../utils/api";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const HeaderLoggedIn = ({
  onSidebarToggle,
}: {
  onSidebarToggle?: () => void;
}) => {
  const theme = useTheme();
  const { user, setUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const getInitials = (first?: string, last?: string) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  const blogItLogo = (
    <Box
      component="img"
      src="/logo.png"
      alt="BlogIt Logo"
      sx={{
        width: 36,
        height: 36,
        mr: 1,
        borderRadius: "50%",
        objectFit: "cover",
        bgcolor: theme.palette.primary.main,
      }}
    />
  );

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleUpdateImageClick = () => {
    handleMenuClose();
    fileInputRef.current?.click();
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      try {
        const url = await uploadImageToCloudinary(file);
        const updatedUser = await updateUserAvatar(url);
        setUser(updatedUser);
        setSnackbarOpen(true);
      } catch (err) {
        console.error("Avatar upload error:", err);
        alert("Failed to upload image");
      }
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/blogs?search=${encodeURIComponent(query)}`);
    }
  };

  if (!user) return null;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        height: 56,
        justifyContent: "center",
        px: { xs: 1, sm: 2, md: 4 },
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{ minHeight: 56, width: "100%", justifyContent: "space-between" }}
      >
        {/* Left: Hamburger and BlogIt Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={onSidebarToggle}
            size="large"
            edge="start"
            sx={{ mr: 1 }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          {blogItLogo}
          <Typography
            variant="h6"
            fontWeight={500}
            color={theme.palette.primary.main}
            sx={{ ml: 2, display: { xs: "none", sm: "block" } }}
          >
            {user?.firstName
              ? `Welcome back, ${user.firstName}!`
              : "Welcome back!"}
          </Typography>
        </Box>
        {/* searchbar Centering */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minWidth={0}
        >
          <SearchBar onSearch={handleSearch} />
        </Box>
        {/* Avatar positioning */}
        <Box display="flex" alignItems="center" gap={1} ml={1}>
          <IconButton onClick={handleAvatarClick}>
            {user.avatar ? (
              <Avatar
                src={user.avatar}
                alt={user.firstName}
                sx={{ width: 36, height: 36 }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {getInitials(user.firstName, user.lastName)}
              </Avatar>
            )}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleUpdateImageClick}>Update Image</MenuItem>
          </Menu>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
      </Toolbar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Avatar image uploaded successfully!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </AppBar>
  );
};

export default HeaderLoggedIn;

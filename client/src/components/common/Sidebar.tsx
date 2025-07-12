import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import DraftsIcon from "@mui/icons-material/Drafts";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/useStore";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const { user } = useAuth();

  const getInitials = (first?: string, last?: string) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          background: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ width: 260, pt: 2 }}>
        <Box display="flex" alignItems="center" px={2} mb={2}>
          <IconButton
            onClick={onClose}
            size="large"
            edge="start"
            sx={{ mr: 1 }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
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
          <Typography
            variant="h6"
            fontWeight={700}
            color={theme.palette.primary.main}
            component={Link}
            to="/blogs"
            sx={{ textDecoration: "none" }}
          >
            BlogIt
          </Typography>
        </Box>
        <Divider />
        {user && (
          <Box display="flex" alignItems="center" px={2} py={2}>
            {user.avatar ? (
              <Avatar
                src={user.avatar}
                alt={user.firstName}
                sx={{ width: 40, height: 40, mr: 1 }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: 18,
                  mr: 1,
                }}
              >
                {getInitials(user.firstName, user.lastName)}
              </Avatar>
            )}
            <Box>
              <Typography fontWeight={700}>
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
          </Box>
        )}
        <Divider />
        <List>
          <ListItem
            component={Link}
            to="/blogs/create"
            sx={{
              mb: 2,
              background: "#fff",
              color: theme.palette.primary.main,
              borderRadius: 999,
              height: 40,
              minHeight: 40,
              width: "fit-content",
              alignSelf: "center",
              px: 2.5,
              py: 0,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              border: `1.5px solid ${theme.palette.primary.main}`,
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              fontSize: 15,
              textTransform: "uppercase",
              letterSpacing: 1,
              "&:hover": {
                background: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
                borderColor: theme.palette.primary.dark,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <AddIcon
                sx={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            </ListItemIcon>
            <ListItemText
              primary="New Post"
              sx={{
                fontWeight: 700,
                fontSize: 15,
                color: theme.palette.primary.main,
                textTransform: "uppercase",
                letterSpacing: 1,
                m: 0,
              }}
            />
          </ListItem>
          <ListItem component={Link} to="/blogs">
            <ListItemIcon>
              <ArticleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Recent Blogs" />
          </ListItem>
          <ListItem component={Link} to="/blogs/drafts">
            <ListItemIcon>
              <DraftsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem component={Link} to="/blogs/editblogs">
            <ListItemIcon>
              <ArticleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Edit Blogs" />
          </ListItem>
          <ListItem component={Link} to="/profile">
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem component={Link} to="/logout">
            <ListItemIcon>
              <LogoutIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

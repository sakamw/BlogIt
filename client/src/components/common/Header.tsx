import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUser from "../../store/useStore";
import axios from "axios";

const Header = () => {
  const theme = useTheme();
  const isResponsive = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser((state) => state.user);
  const logoutUser = useUser((state) => state.logoutUser);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3500/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (e) {
      console.error(e);
    }
    logoutUser();
    navigate("/login");
  };

  // Helper to get initials from name
  const getInitials = (first?: string, last?: string) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#fff",
        color: "#222",
        boxShadow: "0 .2rem .8rem rgba(56, 141, 128, 0.06)",
        height: 80,
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Toolbar
        disableGutters
        sx={{ minHeight: 80, width: "100%", justifyContent: "space-between" }}
      >
        <Box display="flex" alignItems="center">
          {user ? (
            <>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    marginRight: 6,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 20,
                    marginRight: 6,
                  }}
                >
                  {getInitials(user.firstName, user.lastName)}
                </Box>
              )}
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: "#388d80" }}
              >
                Welcome back, {user.firstName}
              </Typography>
            </>
          ) : (
            <>
              <img
                src="opt-logo.png"
                alt="BlogIt Logo"
                style={{ height: 44, marginRight: 6, cursor: "pointer" }}
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate("/");
                  }
                }}
              />
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ letterSpacing: 1, color: "#388d80" }}
              >
                BlogIt
              </Typography>
            </>
          )}
        </Box>
        <Box>
          {user ? (
            <>
              <Button
                component={Link}
                to="/blogs"
                color="inherit"
                variant="outlined"
                sx={{
                  borderColor: "#1a8917",
                  color: "#1a8917",
                  background: "#e6f4f1",
                  px: 1.5,
                  py: 0.2,
                  minWidth: 0,
                  fontWeight: 500,
                  fontSize: 13,
                  borderRadius: 999,
                  textTransform: "none",
                  boxShadow: "none",
                  lineHeight: 1.2,
                  height: 28,
                  mr: 2,
                  "&:hover": { background: "#d2f2e3", borderColor: "#1a8917" },
                }}
              >
                Blogs
              </Button>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  background: "#388d80",
                  color: "#fff",
                  px: 3,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": { background: "#2e7267" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                variant="outlined"
                sx={{
                  borderColor: "#388d80",
                  color: "#388d80",
                  mr: 2,
                  px: 3,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": { background: "#e6f4f1", borderColor: "#388d80" },
                }}
              >
                Login
              </Button>
              {!isResponsive && (
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{
                    background: "#388d80",
                    color: "#fff",
                    px: 3,
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": { background: "#2e7267" },
                  }}
                >
                  Register
                </Button>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

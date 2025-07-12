import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const HeaderPublic = () => {
  const theme = useTheme();
  const isResponsive = useMediaQuery(theme.breakpoints.down("sm"));

  const blogItLogo = (
    <Box
      component={Link}
      to="/"
      sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
    >
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
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
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
          {blogItLogo}
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ letterSpacing: 1, color: theme.palette.primary.main }}
          >
            BlogIt
          </Typography>
        </Box>
        <Box>
          <Button
            component={Link}
            to="/login"
            color="inherit"
            variant="outlined"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              mr: 2,
              px: 3,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                background: theme.palette.secondary.main,
                borderColor: theme.palette.primary.main,
              },
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
                background: theme.palette.primary.main,
                color: "#fff",
                px: 3,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { background: theme.palette.primary.dark },
              }}
            >
              Register
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPublic;

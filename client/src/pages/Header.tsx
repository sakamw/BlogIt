import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const responsive = useMediaQuery(theme.breakpoints.down("sm"));

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
          <img
            src="opt-logo.png"
            alt="BlogIt Logo"
            style={{ height: 44, marginRight: 6, cursor: "pointer" }}
          />
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ letterSpacing: 1, color: "#388d80" }}
          >
            BlogIt
          </Typography>
        </Box>
        <Box>
          {responsive ? (
            <Button
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
              SIGN IN
            </Button>
          ) : (
            <>
              <Button
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
                Sign in
              </Button>
              <Button
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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

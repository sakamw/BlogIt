import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const theme = useTheme();
  const responsive = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        background: { md: "linear-gradient(90deg, #fff 60%, #e6f4f1 100%)" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 10 },
          py: { xs: 4, md: 10 },
          minHeight: "70vh",
          zIndex: 2,
          position: "relative",
        }}
      >
        <Stack
          spacing={4}
          sx={{
            maxWidth: 600,
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#222",
              fontSize: { xs: "2.2rem", md: "3.2rem" },
              lineHeight: 1.1,
            }}
          >
            Welcome to{" "}
            <Box component="span" sx={{ color: "#388d80" }}>
              BlogIt
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#555",
              fontWeight: 400,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
            }}
          >
            Publish your passions, your way. Create a unique and beautiful blog
            easily.
          </Typography>
          <Button
            component={Link}
            to="/signup"
            color="primary"
            variant="contained"
            size="large"
            sx={{
              background: "#388d80",
              color: "#fff",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              boxShadow: "none",
              "&:hover": { background: "#2e7267" },
            }}
          >
            Get Started
          </Button>
        </Stack>
      </Box>

      {!responsive && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          <img
            src="/hero.webp"
            alt="Blogging Hero"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: 0,
              boxShadow: "none",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default LandingPage;

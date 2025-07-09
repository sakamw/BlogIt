import { Box, Typography, Button, Stack } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 10 },
        py: { xs: 6, md: 10 },
        minHeight: { md: "70vh" },
        background: "linear-gradient(90deg, #fff 60%, #e6f4f1 100%)",
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
      <Box
        sx={{
          mt: { xs: 6, md: 0 },
          ml: { md: 8 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/heros.webp"
          alt="Blogging Hero"
          style={{
            maxWidth: 420,
            width: "100%",
            borderRadius: 24,
            boxShadow: "0 .8rem 3.2rem rgba(56, 141, 128, 0.10)",
            background: "#e6f4f1",
          }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage;

import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box textAlign="center">
        <Typography variant="h2" fontWeight={800} color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Oops! The page you are looking for does not exist.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;

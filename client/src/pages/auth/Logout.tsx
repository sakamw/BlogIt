import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/useStore";
import { Box, CircularProgress, Typography } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call backend logout endpoint
        await axios.post(
          "http://localhost:3500/api/auth/logout",
          {},
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        logoutUser();
        navigate("/");
      }
    };

    performLogout();
  }, [logoutUser, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      gap={2}
    >
      <CircularProgress />
      <Typography variant="body1" color="text.secondary">
        Logging out...
      </Typography>
    </Box>
  );
};

export default Logout;

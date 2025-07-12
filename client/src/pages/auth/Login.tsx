import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../store/useStore";
import axiosInstance from "../../api/axios";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const [formError, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (loginDetails: {
      identifier: string;
      password: string;
    }) => {
      const response = await axiosInstance.post("/auth/login", loginDetails);
      return response.data;
    },
    onError: (err: unknown) => {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
      ) {
        setFormError(
          (err.response.data as { message?: string }).message || "Login failed"
        );
      } else {
        setFormError("Login failed");
      }
    },
    onSuccess: (data) => {
      setUser(data);
      navigate("/blogs");
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    mutate({ identifier, password });
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={theme.palette.background.default}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          background: theme.palette.background.paper,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 .2rem 1.6rem rgba(0,0,0,0.08)",
          width: 340,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
          textAlign="center"
          color={theme.palette.text.primary}
        >
          Sign in to BlogIt
        </Typography>
        <Stack spacing={2}>
          {formError && (
            <Typography color="error" fontSize={14} textAlign="center">
              {formError}
            </Typography>
          )}
          <TextField
            label="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending}
            sx={{
              background: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: 16,
              borderRadius: 2,
              py: 1.5,
              boxShadow: "none",
              "&:hover": { background: theme.palette.primary.dark },
            }}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
          <Typography
            textAlign="center"
            fontSize={14}
            mt={1}
            color={theme.palette.text.secondary}
          >
            Don&apos;t have an account?{" "}
            <Button
              component={Link}
              to="/signup"
              sx={{
                color: theme.palette.primary.main,
                textTransform: "none",
                p: 0,
                minWidth: 0,
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;

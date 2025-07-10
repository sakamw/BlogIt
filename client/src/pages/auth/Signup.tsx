import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: User) => {
      try {
        const response = await axios.post(
          "http://localhost:3500/api/auth/register",
          newUser,
          { withCredentials: true }
        );
        return response.data;
      } catch (err: unknown) {
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
          throw new Error(
            (err.response.data as { message?: string }).message ||
              "Signup failed"
          );
        } else {
          throw new Error("Signup failed");
        }
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error && error.message) {
        setError(error.message);
      } else {
        setError("Signup failed");
      }
    },
    onSuccess: (data) => {
      setError("");
      setSuccess(data.message || "Signup successful!");
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
        navigate("/login");
      }, 2000);
    },
  });

  function handleSignUp() {
    setError("");
    const newUser = { firstName, lastName, email, username, password };
    mutate(newUser);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confPass) {
      setError("Passwords and confirm password should match");
      return;
    }
    handleSignUp();
  }

  return (
    <>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#fafbfc"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            background: "#fff",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 .2rem 1.6rem rgba(0,0,0,0.08)",
            width: 425,
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={3} textAlign="center">
            Create your BlogIt account
          </Typography>
          <Stack spacing={2}>
            {error && (
              <Typography color="error" fontSize={14} textAlign="center">
                {error}
              </Typography>
            )}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box flex={1}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  fullWidth
                />
              </Box>
              <Box flex={1}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  fullWidth
                />
              </Box>
            </Stack>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              inputProps={{ minLength: 6 }}
              InputProps={{
                endAdornment: password && (
                  <Button
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    sx={{ minWidth: 0, p: 0, ml: 1, fontSize: 12 }}
                  >
                    {showPassword ? "Hide" : "View"}
                  </Button>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfPassword ? "text" : "password"}
              value={confPass}
              onChange={(e) => setConfPass(e.target.value)}
              required
              fullWidth
              inputProps={{ minLength: 6 }}
              InputProps={{
                endAdornment: confPass && (
                  <Button
                    onClick={() => setShowConfPassword((prev) => !prev)}
                    tabIndex={-1}
                    sx={{ minWidth: 0, p: 0, ml: 1, fontSize: 12 }}
                  >
                    {showConfPassword ? "Hide" : "View"}
                  </Button>
                ),
              }}
            />
            <Button
              variant="contained"
              type="submit"
              loading={isPending}
              fullWidth
              sx={{
                background: "#1a8917",
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 2,
                py: 1.5,
                boxShadow: "none",
                "&:hover": { background: "#166d13" },
              }}
            >
              Sign Up
            </Button>
            <Typography textAlign="center" fontSize={14} mt={1}>
              Already have an account?{" "}
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#1a8917",
                  textTransform: "none",
                  p: 0,
                  minWidth: 0,
                }}
              >
                Sign in
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Signup;

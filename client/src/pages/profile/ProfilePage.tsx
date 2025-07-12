import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Paper,
  Container,
  Alert,
} from "@mui/material";
import { useAuth } from "../../store/useStore";
import {
  updateUserInfo,
  updateUserPassword,
  deactivateUser,
} from "../../utils/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProfilePage = () => {
  const { user, setUser, logoutUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSuccess("");
    setError("");
    try {
      const updated = await updateUserInfo(form);
      setUser(updated);
      setSuccess("Profile updated successfully!");
      setEditMode(false);
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
        setError(
          (err.response.data as { message?: string }).message ||
            "Failed to update profile."
        );
      } else {
        setError("Failed to update profile.");
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");
    try {
      await updateUserPassword(passwordForm);
      setPasswordSuccess("Password updated successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "" });
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
        setPasswordError(
          (err.response.data as { message?: string }).message ||
            "Failed to update password."
        );
      } else {
        setPasswordError("Failed to update password.");
      }
    }
  };

  const handleDeactivate = async () => {
    if (
      window.confirm(
        "Are you sure you want to deactivate your account? This action cannot be undone."
      )
    ) {
      try {
        await deactivateUser();
        logoutUser();
        localStorage.removeItem("authToken");
        localStorage.removeItem("zustand-persist-BlogIt");
        window.location.href = "/";
        window.location.reload();
      } catch {
        alert("Failed to deactivate account.");
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box mb={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </Box>
      <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ width: 64, height: 64 }}>
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              @{user?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          onClick={() => setEditMode((v) => !v)}
          sx={{ mb: 2 }}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </Button>
        {editMode && (
          <Box component="form" mb={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
              Save Changes
            </Button>
          </Box>
        )}
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Change Password
        </Typography>
        <Box component="form" onSubmit={handlePasswordSubmit}>
          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Update Password
          </Button>
          {passwordSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {passwordSuccess}
            </Alert>
          )}
          {passwordError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {passwordError}
            </Alert>
          )}
        </Box>
      </Paper>
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="error"
          sx={{
            backgroundColor: "#d32f2f",
            color: "#fff",
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: 2,
          }}
          onClick={handleDeactivate}
        >
          Deactivate Account
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;

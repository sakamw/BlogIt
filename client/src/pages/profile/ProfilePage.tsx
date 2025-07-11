import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Paper,
  Container,
  Divider,
  Alert,
} from "@mui/material";
import { useAuth, useBlogs } from "../../store/useStore";

const ProfilePage = () => {
  const { user } = useAuth();
  const { userBlogs } = useBlogs();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSave = () => {
    // TODO: Implement update user info API call
    setSuccess("Profile updated (not yet implemented)");
    setEditMode(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
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
      <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          My Blogs
        </Typography>
        {userBlogs.length === 0 ? (
          <Typography color="text.secondary">
            You have not created any blogs yet.
          </Typography>
        ) : (
          userBlogs.map((blog) => (
            <Box key={blog.id} mb={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                {blog.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {blog.synopsis}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                sx={{ mr: 1, mt: 1 }}
                href={`/blogs/${blog.id}/edit`}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                sx={{ mt: 1 }}
              >
                Delete
              </Button>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))
        )}
      </Paper>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Change Password
        </Typography>
        <Box component="form">
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" sx={{ mt: 2 }}>
            Update Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

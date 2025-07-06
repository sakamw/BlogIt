import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getCurrentUser, logout } from "../../utils/auth";

export default function Header() {
  const user = getCurrentUser();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}
        >
          BlogIt
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          {user ? (
            <>
              <Typography
                variant="body1"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Welcome back, {user.username}!
              </Typography>
              <Button color="inherit" component={RouterLink} to="/blogs">
                Posts
              </Button>
              <Button color="inherit" component={RouterLink} to="/blogs/new">
                New Blog
              </Button>
              <Button color="inherit" component={RouterLink} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/auth/login">
                Login
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/auth/register"
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

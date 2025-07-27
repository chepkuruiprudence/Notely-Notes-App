import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useUser from "../store/userstore";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  console.log("User from store:", user);

  useEffect(() => {
    if (!user) {
      console.warn("No user data available for avatar rendering.");
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = user
    ? [
        { label: "Home", to: "/" },
        { label: "My Notes", to: "/MyNotes" },
        { label: "Create Note", to: "/Createnote" },
        { label: "Notes", to: "/Notes" },
        { label: "Profile", to: "/profile" },
        { icon: <LogoutIcon />, onClick: handleLogout },
      ]
    : [
        { label: "Home", to: "/" },
        { label: "Login", to: "/login" },
        { label: "Notes", to: "/notes" },
        { label: "Register", to: "/register" },
      ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "white" }}>
        Notely
      </Typography>
      <List>
        {navLinks.map((item, index) => (
          <ListItem
            key={index}
            component={item.to ? Link : "button"}
            to={item.to}
            onClick={item.onClick}
            sx={{ color: "white" }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e1e1e" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: "16px", color: "white" }}
        >
          Notely
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            ml: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {navLinks.map((item, index) =>
            item.to ? (
              <Button
                key={index}
                variant="text"
                sx={{
                  color: "white",
                  fontSize: "16px",
                  "&:hover": { borderColor: "#fff" },
                }}
                component={Link}
                to={item.to}
              >
                {item.label}
              </Button>
            ) : item.icon ? (
              <IconButton
                key={index}
                onClick={item.onClick}
                color="inherit"
                sx={{ ml: 2 }}
              >
                {item.icon}
              </IconButton>
            ) : null,
          )}
        </Box>

        {user ? (
          <Avatar
            component={Link}
            to="/profile"
            sx={{
              bgcolor: "greenyellow",
              color: "black",
              textDecoration: "none",
            }}
          >
            {user.firstName?.[0]?.toUpperCase() ?? ""}
            {user.secondName?.[0]?.toUpperCase() ?? ""}
          </Avatar>
        ) : (
          <Typography variant="caption" color="gray">
            Loading user...
          </Typography>
        )}
      </Toolbar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { backgroundColor: "#0C3B2E", color: "white", width: 220 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

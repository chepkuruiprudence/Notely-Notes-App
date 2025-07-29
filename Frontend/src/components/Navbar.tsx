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
        { label: "Trash", to: "/trash" },
      ]
    : [
        { label: "Home", to: "/" },
        { label: "Login", to: "/login" },
        { label: "Notes", to: "/notes" },
        { label: "Register", to: "/register" },
      ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        p: 2,
        backgroundColor: "#0C3B2E",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          color: "white",
          fontWeight: 600,
          fontFamily: "Roboto",
          letterSpacing: "0.05em",
        }}
      >
        Notely
      </Typography>
      <List>
        {navLinks.map((item, index) => (
          <ListItem
            key={index}
            component={item.to ? Link : "button"}
            to={item.to}
            onClick={item.onClick}
            sx={{
              color: "white",
              py: 1.5,
              px: 2,
              "&:hover": {
                backgroundColor: "#135d48",
                borderRadius: 1,
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1e1e1e",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" }, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "Poppins",
            color: "white",
          }}
        >
          Notely
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            ml: "auto",
            gap: 2,
            alignItems: "center",
          }}
        >
          {navLinks.map((item, index) =>
            item.to ? (
              <Button
                key={index}
                component={Link}
                to={item.to}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#333",
                    borderRadius: "6px",
                  },
                }}
              >
                {item.label}
              </Button>
            ) : item.icon ? (
              <IconButton
                key={index}
                onClick={item.onClick}
                sx={{
                  color: "white",
                  "&:hover": { color: "#f44336" },
                }}
              >
                {item.icon}
              </IconButton>
            ) : null,
          )}
        </Box>

        <Box sx={{ ml: 2 }}>
          {user ? (
            <Avatar
              component={Link}
              to="/profile"
              sx={{
                bgcolor: "#9fef00",
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              {user.firstName?.[0]?.toUpperCase() ?? ""}
              {user.lastName?.[0]?.toUpperCase() ?? ""}
            </Avatar>
          ) : (
            <Typography variant="caption" color="gray">
              Loading user...
            </Typography>
          )}
        </Box>
      </Toolbar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: "#0C3B2E",
            color: "white",
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

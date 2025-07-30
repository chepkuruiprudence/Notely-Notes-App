import {
  Box,
  Grid,
  Typography,
  List,
  ListItemText,
  Avatar,
  Button,
  Alert,
  ListItemButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../store/userstore";
import { useQuery } from "@tanstack/react-query";
import Notecard from "../components/notecard";
import type { Note } from "../types/note";
import axiosInstance from "../api/axios";

const Dashboard = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "My Notes", to: "/MyNotes" },
    { label: "Create Note", to: "/Createnote" },
    { label: "Notes", to: "/Notes" },
    { label: "Profile", to: "/profile" },
  ];

  const {
    data: pinnedNotes = [],
    isLoading,
    isError,
    error,
  } = useQuery<Note[]>({
    queryKey: ["pinnedNotes"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/user/pinned");
        return res.data.data || [];
      } catch (error) {
        console.error("Error fetching pinned notes:", error);
        return [];
      }
    },
  });

  return (
    <Grid container height="100vh">
      <Grid
        size={{
          xs: 12,
          md: 3,
        }}
        sx={{
          backgroundColor: "#0C3B2E",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        {isError && (
          <Alert severity="error">
            {error.message || "Failed to load pinned notes"}
          </Alert>
        )}

        <Box>
          <Typography variant="h5" mb={2}>
            Notely Dashboard
          </Typography>

          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
              }}
            >
              <Avatar
                component={Link}
                to="/profile"
                sx={{
                  bgcolor: "greenyellow",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {user.firstName?.[0]?.toUpperCase() || ""}
                {user.lastName?.[0]?.toUpperCase() || ""}
              </Avatar>
              <Typography variant="subtitle1">
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
          )}

          <List>
            {navLinks.map((item, index) => (
              <ListItemButton
                key={index}
                component={Link}
                to={item.to}
                sx={{ color: "white" }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: "red", color: "white", mt: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 9,
        }}
        sx={{
          backgroundColor: "#f4f4f4",
          p: 4,
          overflowY: "auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName}!
        </Typography>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Note Summary
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  backgroundColor: "#e3f2fd",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <Typography variant="h6">Pinned Notes</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {pinnedNotes?.length || 0}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  backgroundColor: "#e8f5e9",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <Typography variant="h6">Public Notes</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {pinnedNotes?.filter((note: Note) => note.isPublic).length ||
                    0}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  backgroundColor: "#fff3e0",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <Typography variant="h6">Private Notes</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {pinnedNotes?.filter((note: Note) => !note.isPublic).length ||
                    0}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Pinned Notes
          </Typography>

          {isLoading && <Typography>Loading pinned notes...</Typography>}
          {isError && (
            <Typography color="error">Error loading pinned notes.</Typography>
          )}

          {!isLoading && pinnedNotes?.length === 0 && (
            <Typography>No pinned notes available.</Typography>
          )}

          {pinnedNotes?.length > 0 && (
            <Grid container spacing={2}>
              {pinnedNotes.map((note: Note) => (
                <Grid key={note.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Notecard
                    noteId={note.id}
                    title={note.title}
                    synopsis={note.synopsis}
                    content={note.content}
                    userId={note.userId}
                    isPinned={note.isPinned ?? false}
                    isPublic={note.isPublic ?? false}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

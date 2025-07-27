import React, { use } from "react";
import Notecard from "../components/notecard";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Stack,
  Alert,
  CircularProgress,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

interface Note {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  userId: string;
}

const Notes = () => {
  const { data, isLoading, isError, error } = useQuery<Note[], Error>({
    queryKey: ["myNotes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/notes");
      return response.data;
    },
  });

  if (isError) {
    return (
      <Stack sx={{ p: 5 }} alignItems="center">
        <Alert severity="error">Failed to load Notes: {error.message}</Alert>
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <Stack sx={{ p: 5 }} alignItems="center">
        <CircularProgress />
        <Typography>Loading Notes ...</Typography>
      </Stack>
    );
  }

  return (
    <Box sx={{ paddingTop: "80px", paddingX: 2 }}>
      <Grid container spacing={3}>
        {data &&
          data.map((note) => (
            <Grid key={note.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Notecard
                id={note.id}
                title={note.title}
                synopsis={note.synopsis}
                content={note.content}
                userId={note.userId}
              />
            </Grid>
          ))}
      </Grid>

      {data?.length === 0 && <Typography>No created notes yet.</Typography>}

      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Card
          sx={{ width: "100%", maxWidth: 500, boxShadow: 3, borderRadius: 3 }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Normalize creating notes.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#3A015C" }}
              fullWidth
              component={Link}
              to="/createNote"
            >
              Create New Note
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Notes;

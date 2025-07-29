import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface Note {
  id: string;
  title: string;
  synopsis: string;
  content: string;
}

const Fullnote = () => {
  const { noteId } = useParams();

  const {
    data: Note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["singleNote", noteId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/notes/${noteId}`);
      return response.data.data;
    },
    enabled: !!noteId,
  });

  if (isLoading) {
    return (
      <Stack sx={{ p: 5 }} alignItems={"center"}>
        <CircularProgress />
        <Typography>Loading Note...</Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 6 }}>
        Failed to load note: {error.message}
      </Alert>
    );
  }

  if (!Note) {
    return <Typography>No note found.</Typography>;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 4, md: 8 },
        p: { xs: 2, md: 4 },
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          fontSize: { xs: "1.8rem", md: "2.4rem" },
          mb: 2,
        }}
      >
        {Note.title}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#1976d2",
            fontWeight: 600,
            mb: 1,
            fontSize: { xs: "1.2rem", md: "1.3rem" },
          }}
        >
          Synopsis
        </Typography>
        <Typography sx={{ color: "#444", fontSize: "1rem" }}>
          {Note.synopsis}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#1976d2",
            fontWeight: 600,
            mb: 1,
            fontSize: { xs: "1.2rem", md: "1.3rem" },
          }}
        >
          Content
        </Typography>
        <Box sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7 }}>
          <ReactMarkdown>{Note.content}</ReactMarkdown>
        </Box>
      </Box>
    </Container>
  );
};

export default Fullnote;

import {
  Box,
  Typography,
  Avatar,
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
        sx={{ mt: 3, fontSize: { xs: "1.8rem", md: "2.4rem" } }}
      >
        {Note.title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
          flexWrap: "wrap",
        }}
      ></Box>

      <Typography
        variant="body1"
        component="div"
        sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7 }}
      >
        <ReactMarkdown>{Note.content}</ReactMarkdown>
      </Typography>
    </Container>
  );
};

export default Fullnote;

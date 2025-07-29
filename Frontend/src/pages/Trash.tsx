import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import TrashNoteCard from "../components/TrashNoteCard ";
import { Container, Typography, CircularProgress, Box } from "@mui/material";

interface Note {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  isDeleted: boolean;
}

const fetchDeletedNotes = async (): Promise<Note[]> => {
  const response = await axiosInstance.get("/user/trash");
  return response.data.data;
};

const Trash: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<Note[], Error>({
    queryKey: ["trashNotes"],
    queryFn: fetchDeletedNotes,
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Trash
      </Typography>

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Typography color="error" mt={2}>
          Error fetching deleted notes: {error.message}
        </Typography>
      )}

      {data?.length === 0 && (
        <Typography variant="body1" mt={2}>
          No deleted notes found.
        </Typography>
      )}

      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        mt={2}
        justifyContent="flex-start"
      >
        {data?.map((note) => (
          <Box
            key={note.id}
            flexBasis={{
              xs: "100%",
              sm: "48%",
              md: "30%",
            }}
          >
            <TrashNoteCard
              id={note.id}
              title={note.title}
              synopsis={note.synopsis}
              content={note.content}
              isDeleted={note.isDeleted }
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Trash;

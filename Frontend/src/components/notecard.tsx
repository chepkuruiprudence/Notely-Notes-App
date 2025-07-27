import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import useUser from "../store/userstore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import Fullnote from "./Fullnote";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PushPinIcon from "@mui/icons-material/PushPin";

interface NoteCardProps {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  userId: string;
}

const Notecard: React.FC<NoteCardProps> = ({ id, title, synopsis, userId, content }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();

  const queryClient = useQueryClient();

  const { mutate: updateNote } = useMutation({
    mutationFn: async (updatedNote: {
      title: string;
      synopsis: string;
      content: string;
    }) => {
      const res = await axiosInstance.patch(`/notes/${id}`, updatedNote);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      setIsEditing(false);
    },

    onError: (err) => {
      console.error("update error", err);
    },
  });

  const handleSaveUpdatedNote = (updatedNote: {
    title: string;
    synopsis: string;
    content: string;
  }) => {
    updateNote({
      title: updatedNote.title,
      synopsis: updatedNote.synopsis,
      content: updatedNote.content,
    });
  };

  const { mutate: deleteNote } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },

    onError: (err) => {
      console.log("Error deleting", err);
    },
  });

  if (isEditing) {
    return (
      <EditNoteForm
        initialTitle={title}
        initialSynopsis={synopsis}
        initialContent={content}
        onSave={handleSaveUpdatedNote}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  const { mutate: togglePin } = useMutation({
  mutationFn: async () => {
    await axiosInstance.patch(`/notes/${id}/pin-toggle`);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    queryClient.invalidateQueries({ queryKey: ["pinnedNotes"] });
  },
});

  return (
    <Card>
      <CardContent>
        <Typography>Create a Note.</Typography>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {synopsis}
        </Typography>

        <Button
          component={Link}
          to={`/notes/${id}`}
          variant="text"
          sx={{ color: "#6633CC", fontWeight: "bold" }}
        >
          Read More →
        </Button>

        {user?.id === userId && (
          <Stack direction="row" spacing={2} padding={1}>
  <Tooltip title="Edit Note">
    <IconButton
      onClick={() => setIsEditing(true)}
      sx={{
        backgroundColor: "#3A015C",
        color: "white",
        "&:hover": { backgroundColor: "#29013f" },
      }}
    >
      <EditNoteIcon />
    </IconButton>
  </Tooltip>

  <Tooltip title="Delete Note">
    <IconButton
      onClick={() => {
  if (window.confirm("Are you sure you want to delete this note?")) {
    deleteNote();
  }
}}
      sx={{
        backgroundColor: "red",
        color: "white",
        "&:hover": { backgroundColor: "#b71c1c" },
      }}
    >
      <DeleteIcon />
    </IconButton>
  </Tooltip>

  <Tooltip title="Toggle Pin">
  <IconButton onClick={() => togglePin()}>
    <PushPinIcon />
  </IconButton>
</Tooltip>
</Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default Notecard;

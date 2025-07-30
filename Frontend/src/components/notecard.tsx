import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import useUser from "../store/userstore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PushPinIcon from "@mui/icons-material/PushPin";
import SummarizeButton from "./SummarizeButton";

interface NoteCardProps {
  noteId: string;
  title: string;
  synopsis: string;
  content: string;
  userId: string;
  isPinned: boolean;
  isPublic: boolean;
}

const Notecard: React.FC<NoteCardProps> = ({
  noteId,
  title,
  synopsis,
  content,
  userId,
  isPinned,
  isPublic,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const [summary, setSummary] = useState("");

  const { mutate: updateNote } = useMutation({
    mutationFn: async (updatedNote: {
      title: string;
      synopsis: string;
      content: string;
      isPinned: boolean;
      isPublic: boolean;
    }) => {
      const res = await axiosInstance.patch(`/notes/${noteId}`, updatedNote);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsEditing(false);
    },
    onError: (err) => console.error("Update error", err),
  });

  const { mutate: deleteNote } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["pinnedNotes"] });
      queryClient.invalidateQueries({ queryKey: ["myNotes"] });
      queryClient.invalidateQueries({ queryKey: ["Notes"] });
    },
    onError: (err) => {
      console.error("Delete error", err);
      if (err instanceof Error) {
        alert(`Failed to delete note: ${err.message}`);
      }
    },
  });

  const { mutate: togglePin, isPending: isTogglingPin } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.patch(
        `/notes/${noteId}/pin-toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["pinnedNotes"] });
      queryClient.invalidateQueries({ queryKey: ["myNotes"] });
      queryClient.invalidateQueries({ queryKey: ["publicNotes"] });
    },
    onError: (err) => {
      console.error("Pin toggle error", err);
      if (err instanceof Error) {
        alert(`Failed to toggle pin: ${err.message}`);
      }
    },
  });

  const handleSaveUpdatedNote = (updatedNote: {
    title: string;
    synopsis: string;
    content: string;
    isPinned: boolean;
    isPublic: boolean;
  }) => {
    updateNote(updatedNote);
  };

  if (isEditing) {
    return (
      <EditNoteForm
        initialTitle={title}
        initialSynopsis={synopsis}
        initialContent={content}
        initialIsPinned={isPinned ?? false}
        initialIsPublic={isPublic ?? false}
        onSave={handleSaveUpdatedNote}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card
      sx={{
        border: isPinned ? "2px solid #6633CC" : "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {synopsis}
        </Typography>

        <Chip
          label={isPublic ? "Public" : "Private"}
          color={isPublic ? "success" : "default"}
          size="small"
          sx={{ mt: 1, mb: 1 }}
        />

        <Button
          component={Link}
          to={`/notes/${noteId}`}
          variant="text"
          sx={{ color: "#6633CC", fontWeight: "bold", mt: 1 }}
        >
          Read More →
        </Button>

        <SummarizeButton content={content} onSummary={setSummary} />

        {summary && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Summary:</strong> {summary}
          </Typography>
        )}

        {user?.id === userId && (
          <Stack direction="row" spacing={1} mt={2}>
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
                  if (
                    window.confirm("Are you sure you want to delete this note?")
                  ) {
                    console.log("Attempting to delete note:", noteId);
                    console.log("Using token:", token);
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

            <Tooltip title={isPinned ? "Unpin Note" : "Pin Note"}>
              <IconButton
                onClick={() => togglePin()}
                disabled={isTogglingPin}
                sx={{
                  backgroundColor: isPinned ? "#6633CC" : "inherit",
                  color: isPinned ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor: isPinned
                      ? "#4a1e99"
                      : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                {isTogglingPin ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <PushPinIcon />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default Notecard;

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Tooltip,
  Button,
  Box,
} from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface TrashNoteCardProps {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  isDeleted: boolean;
}

const TrashNoteCard: React.FC<TrashNoteCardProps> = ({
  id,
  title,
  synopsis,
  content,
  isDeleted,
}) => {
  const queryClient = useQueryClient();

  const { mutate: restoreNote } = useMutation({
    mutationFn: () => axiosInstance.patch(`/notes/${id}/restore`),
    onSuccess: () => {
      queryClient.setQueryData(["trashNotes"], (oldData: any) =>
        oldData?.filter((note: any) => note.id !== id),
      );
    },
  });

  const { mutate: permanentlyDelete } = useMutation({
    mutationFn: () => axiosInstance.delete(`/notes/${id}/permanent`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trashNotes"] });
    },
  });

  return (
    <Card
      sx={{
        borderLeft: "6px solid #e53935",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 300,
        p: 2,
        my: 2,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          {synopsis}
        </Typography>

        <Typography variant="body2" mt={1}>
          {content.length > 150 ? content.slice(0, 150) + "..." : content}
        </Typography>
      </CardContent>

      <Box mt="auto">
        <Stack direction="row" spacing={2}>
          <Tooltip title="Restore Note">
            <Button
              variant="contained"
              color="primary"
              startIcon={<RestoreFromTrashIcon />}
              onClick={() => restoreNote()}
              disabled={!isDeleted}
            >
              Restore
            </Button>
          </Tooltip>

          <Tooltip title="Permanently Delete">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteForeverIcon />}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to permanently delete this note?",
                  )
                ) {
                  permanentlyDelete();
                }
              }}
            >
              Delete
            </Button>
          </Tooltip>
        </Stack>
      </Box>
    </Card>
  );
};

export default TrashNoteCard;

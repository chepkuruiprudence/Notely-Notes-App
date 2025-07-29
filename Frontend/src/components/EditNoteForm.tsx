import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

interface EditNoteFormProps {
  initialTitle: string;
  initialSynopsis: string;
  initialContent: string;
  initialIsPinned: boolean;
  initialIsPublic: boolean;
  onSave: (updatedNote: {
    title: string;
    synopsis: string;
    content: string;
    isPinned: boolean;
    isPublic: boolean;
  }) => void;
  onCancel: () => void;
}

const EditNoteForm = ({
  initialTitle,
  initialSynopsis,
  initialContent,
  initialIsPublic,
  initialIsPinned,
  onSave,
  onCancel,
}: EditNoteFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [synopsis, setSynopsis] = useState(initialSynopsis);
  const [content, setContent] = useState(initialContent);
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [isPinned, setIsPinned] = useState(initialIsPinned);

  const handleSaveUpdatedNote = () => {
    onSave({ title, synopsis, content, isPinned, isPublic });
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              multiline
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Synopsis"
              variant="outlined"
              multiline
              rows={4}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              fullWidth
            />
            <TextField
              label="Content"
              variant="outlined"
              multiline
              rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
            />

            <TextField
              select
              label="Pin Note"
              value={isPinned ? "yes" : "no"}
              onChange={(e) => setIsPinned(e.target.value === "yes")}
              fullWidth
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>

            <TextField
              select
              label="Make Public"
              value={isPublic ? "yes" : "no"}
              onChange={(e) => setIsPublic(e.target.value === "yes")}
              fullWidth
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveUpdatedNote}
                fullWidth
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onCancel}
                fullWidth
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditNoteForm;

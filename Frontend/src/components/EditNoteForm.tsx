import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
} from "@mui/material";

interface EditNoteFormProps {
  initialTitle: string;
  initialSynopsis: string;
  initialContent: string;

  onSave: (updatedNote: {
    title: string;
    synopsis: string;
    content: string;
  }) => void;

  onCancel: () => void;
}

const EditNoteForm = ({
  initialTitle,
  initialSynopsis,
  initialContent,
  onSave,
  onCancel,
}: EditNoteFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [synopsis, setSynopsis] = useState(initialSynopsis);
  const [content, setContent] = useState(initialContent);

  const handleSaveUpdatedNote = () => {
    onSave({ title, synopsis, content });
  };
  return (
    <Box>
      <Card>
        <CardContent>
          <Stack>
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

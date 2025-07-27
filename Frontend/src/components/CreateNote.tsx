import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axios";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Alert,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const res = await axiosInstance.post("/notes", {
        title,
        synopsis,
        content,
        visibility,
      });

      return res.data;
    },

    onSuccess: () => {
      navigate("/Mynotes");
      setTitle("");
      setSynopsis("");
      setContent("");
      setVisibility("private");
      setFormError("");
    },

    onError: (err: any) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError(err.message || "Something went wrong");
      }
    },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Card sx={{ width: "500px", padding: 2, marginTop: 10 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ color: "green" }}>
              New Note
            </Typography>

            {formError && <Alert severity="error">{formError}</Alert>}

            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Synopsis"
              multiline
              rows={3}
              variant="outlined"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
            <TextField
              label="Content"
              multiline
              rows={6}
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <FormControl>
              <FormLabel>Visibility</FormLabel>
              <RadioGroup
                row
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private"
                />
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
              </RadioGroup>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#3A015C" }}
              onClick={() => mutate()}
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Note"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateNote;

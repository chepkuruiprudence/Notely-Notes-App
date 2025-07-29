import { useReactMediaRecorder } from "react-media-recorder";
import { useState } from "react";
import {
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import axiosInstance from "../api/axios";


interface AudioRecorderProps {
  onTranscript: (transcript: string) => void;
}

export default function AudioRecorder({ onTranscript }: AudioRecorderProps) {
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStart: () => {
      setIsRecording(true);
      setTranscript("");
    },
    onStop: (_url: string, blob: Blob) => {
      setRecordedBlob(blob);
      setIsRecording(false);
    },
  });

  const uploadAndTranscribe = async () => {
    if (!recordedBlob) return;

    const formData = new FormData();
    formData.append("audio", recordedBlob, "note.webm");

    try {
      setLoading(true);
      setError("");

       console.log("Base URL being used:", axiosInstance.defaults.baseURL);
       
      const response = await axiosInstance.post("/transcription/transcribe", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});


      const text = response.data.transcript;
      setTranscript(text);
      onTranscript(text);
    } catch (err) {
      console.error("Transcription failed:", err);
      setError("Transcription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Tooltip title="Start Recording">
          <IconButton color="primary" onClick={startRecording}>
            <MicIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Stop Recording">
          <IconButton
            color="error"
            onClick={stopRecording}
            sx={{ borderRadius: "50%" }}
          >
            <StopCircleIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Transcribe">
          <span>
            <IconButton
              color="success"
              onClick={uploadAndTranscribe}
              disabled={!recordedBlob || loading}
            >
              {loading ? <CircularProgress size={24} /> : <CloudUploadIcon />}
            </IconButton>
          </span>
        </Tooltip>

        {isRecording && (
          <Chip
            icon={
              <FiberManualRecordIcon
                sx={{ color: "red", animation: "pulse 1s infinite" }}
              />
            }
            label="Recording..."
            color="default"
            variant="outlined"
            sx={{
              "@keyframes pulse": {
                "0%": { opacity: 1 },
                "50%": { opacity: 0.3 },
                "100%": { opacity: 1 },
              },
              fontWeight: "bold",
            }}
          />
        )}
      </Box>

      {transcript && (
        <Box mt={2}>
          <Typography variant="subtitle2" color="textSecondary">
            <strong>Transcript:</strong>
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {transcript}
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import axiosInstance from "../api/axios"; 

interface SummarizeButtonProps {
  content: string;
  onSummary: (summary: string) => void;
}

export default function SummarizeButton({ content, onSummary }: SummarizeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/summarize", {
        content,
      });
      onSummary(response.data.summary);
    } catch (error) {
      console.error("Summarization error:", error);
      onSummary("⚠️ Failed to summarize note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSummarize}
      disabled={loading}
      variant="outlined"
      sx={{ mt: 2 }}
    >
      {loading ? <CircularProgress size={20} /> : "Summarize"}
    </Button>
  );
}

import { Card, Typography, Avatar, Button, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface Props {
  user: {
    id: string;
    userName: string;
    profileImage: string;
  };
}

const ProfileImageCard = ({ user }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("token");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      setUploading(true);

      await axios.patch(
        `/user/upload-profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      alert("Profile image updated successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card sx={{ p: 3, boxShadow: 3 }}>
      <Stack alignItems="center" spacing={2} mt={2}>
        <Typography variant="h6" gutterBottom>
          Profile Image
        </Typography>
        <Avatar
          src={preview || `https://bloggit-site-database.onrender.com/${user.profileImage}`}
          sx={{ width: 120, height: 120 }}
        />
        <Typography variant="body1">@{user.userName}</Typography>

        <Button variant="outlined" component="label">
          Choose Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>

        {selectedImage && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save Image"}
          </Button>
        )}
      </Stack>
    </Card>
  );
};

export default ProfileImageCard;

import React, { useRef, useState } from "react";
import { Avatar, Box, Button } from "@mui/material";

const ProfileImageUpload = ({ user }: { user: any }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const avatarSrc = preview || user.profileImage || undefined;
  const showInitials = !preview && !user.profileImage;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Avatar
        src={avatarSrc}
        sx={{
          width: 100,
          height: 100,
          cursor: "pointer",
          bgcolor: "transparent",
          color: "black",
          border: "2px solid #1976d2",
          fontSize: 32,
        }}
        onClick={handleAvatarClick}
      >
        {showInitials &&
          `${user.firstName?.[0]?.toUpperCase() ?? ""}${user.secondName?.[0]?.toUpperCase() ?? ""}`}
      </Avatar>

      <Button variant="outlined" onClick={handleAvatarClick}>
        Upload Image
      </Button>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default ProfileImageUpload;

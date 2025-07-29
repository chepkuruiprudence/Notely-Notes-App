import React, { useRef, useState } from "react";
import { Avatar, Box } from "@mui/material";
import axiosInstance from "../api/axios";

const Profile = ({ user }: { user: any }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const formData = new FormData();
      formData.append("profileImage", file);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("userName", user.userName);
      formData.append("emailAddress", user.emailAddress);

      try {
        const res = await axiosInstance.post("/user/update", formData, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
});

        const data = await res.data;
        console.log("Upload result:", data);
      } catch (err) {
        console.error("Upload failed", err);
      }
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
        gap: 2,
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
          `${user.firstName?.[0]?.toUpperCase() ?? ""}${
            user.lastName?.[0]?.toUpperCase() ?? ""
          }`}
      </Avatar>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default Profile;

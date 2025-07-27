import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import PasswordForm from "../components/PasswordEditForm";
import ProfileImageUpload from "../components/Profileupdate";

interface user {
  firstName: string;
  secondName: string;
  email: string;
  userName: string;
  avatar: string;
}

const Profile = () => {
  const [user, setUser] = useState<user | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    secondName: "",
    email: "",
    userName: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/user");
        setUser(res.data);
        setFormValues({
          firstName: res.data.firstName,
          secondName: res.data.secondName,
          email: res.data.email,
          userName: res.data.userName,
        });
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <Typography>Loading profile...</Typography>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axiosInstance.patch("/user", formValues);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 4,
        padding: 2,
        paddingTop: "80px",
      }}
    >
      <Card
        sx={{
          padding: 3,
          boxShadow: 3,
          width: { xs: "100%", sm: "90%", md: "500px" },
          marginTop: { xs: 2, md: 6 },
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <ProfileImageUpload user={user} />
            <Typography variant="h6">
              {user.firstName} {user.secondName}
            </Typography>
          </Box>

          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="Second Name"
              name="secondName"
              value={formValues.secondName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="User Name"
              name="userName"
              value={formValues.userName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Stack>

          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#6633CC" }}
            fullWidth
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardContent>
      </Card>

      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "500px" },
          marginTop: { xs: 2, md: 6 },
        }}
      >
        <Card sx={{ padding: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <PasswordForm />
        </Card>
      </Box>
    </Box>
  );
};

export default Profile;

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
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  profileImage: string;
}

const Profile = () => {
  const [user, setUser] = useState<user | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    userName: "",
    profileImage: "",
  });
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user");
        const profile = response.data.profile;
        

        setUser({
          id: profile.id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          emailAddress: profile.emailAddress,
          userName: profile.userName,
          profileImage: profile.profileImage,
        });

        setFormValues({
          firstName: profile.firstName,
          lastName: profile.lastName,
          emailAddress: profile.emailAddress,
          userName: profile.userName,
          profileImage: profile.profileImage,
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

  console.log("Current User:", user);

  const handleSave = async () => {
    try {
      await axiosInstance.patch(`/user/${user.id}`, formValues,  {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});
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
              {user.firstName} {user.lastName}
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
              name="lastName"
              value={formValues.lastName}
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
              value={formValues.emailAddress}
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

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import PasswordForm from "../components/PasswordEditForm";
import ProfileImageCard from "../components/Profileimagecard";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  const handleSave = async () => {
    try {
      await axiosInstance.patch(`/user/user`, formValues);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      
      <Grid
        size={{ xs: 12, md: 4, lg: 3 }}
        display="flex"
        justifyContent="center"
      >
        <ProfileImageCard user={user} />
      </Grid>

      <Grid
        size={{ xs: 12, md: 8, lg: 6 }}
        display="flex"
        justifyContent="center"
      >
        <Card sx={{ padding: 3, boxShadow: 3, width: "100%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
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
                name="emailAddress"
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
      </Grid>

      <Grid
        size={{ xs: 12, md: 8, lg: 6 }}
        display="flex"
        justifyContent="center"
      >
        <Card sx={{ padding: 3, boxShadow: 3, width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <PasswordForm />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;

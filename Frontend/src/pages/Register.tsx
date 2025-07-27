import React, { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { data, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import { isAxiosError } from "axios";

interface user {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  passWord: string;
}

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [passWord, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: user) => {
      const response = await axiosInstance.post("/auth/register", newUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        console.log(err);
        setFormError(err.response?.data?.message || "Server error");
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleSignUp = () => {
    setFormError("");
    if (passWord !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      userName,
      emailAddress,
      passWord,
    };
    mutate(newUser);
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        flexDirection: "column",
        backgroundColor: "#9EADC8",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 900,
          width: "100%",
        }}
      >
        <CardContent sx={{ flex: 1, width: "100%" }}>
          <Paper component="form" sx={{ padding: 2 }}>
            <Stack spacing={3}>
              {formError && <Alert severity="error">{formError}</Alert>}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="First Name"
                  fullWidth
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Second Name"
                  fullWidth
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Stack>

              <TextField
                label="Username"
                fullWidth
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />

              <FormControl variant="outlined" fullWidth required>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={passWord}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl variant="outlined" fullWidth required>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                  label="Confirm Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                variant="contained"
                size="large"
                onClick={handleSignUp}
                disabled={isPending}
                sx={{ backgroundColor: "#3A015C" }}
              >
                Sign Up
              </Button>

              <Typography>
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            </Stack>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;

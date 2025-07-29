import { useState } from "react";
import "@fontsource/roboto/400.css";
import {
  Card,
  Box,
  CardContent,
  CardActions,
  TextField,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../store/userstore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axios";

interface signInDetails {
  identifier: string;
  passWord: string;
}

const Login = () => {
  const token = localStorage.getItem("token");
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [passWord, setPassWord] = useState("");
  const [formError, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["login_user"],
    mutationFn: async (loginDetails: signInDetails) => {
      const response = await axiosInstance.post("/auth/login", loginDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data.userDetails);
      navigate("/dashboard");
    },
  });

  function handleSignIn() {
    setFormError("");
    mutate({ identifier: identifier.trim(), passWord: passWord.trim() });
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#9EADC8",
      }}
    >
      <Card
        sx={{
          width: "700px",
          padding: 3,
          backgroundColor: "#OC3B2E",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Stack spacing={3}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField
              label="userName or Email"
              variant="outlined"
              fullWidth
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              sx={{ backgroundColor: "white" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: "10px" }}
            />
          </Stack>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "center", paddingBottom: 2 }}
        >
          <LoadingButton
            variant="contained"
            size="large"
            onClick={handleSignIn}
            loading={isPending}
            sx={{ backgroundColor: "#3A015C" }}
          >
            Sign In
          </LoadingButton>
          <Typography>Forgot password</Typography>
        </CardActions>
        <Typography>
          Don't have an account?<Link to="/register">Sign Up</Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;

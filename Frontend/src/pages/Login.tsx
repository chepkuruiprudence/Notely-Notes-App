import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
  Stack,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5rem",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "50%",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Log in to your Account
            </Typography>

            <TextField
              variant="outlined"
              label="Username or Email"
              fullWidth
              required
              sx={{ backgroundColor: "white" }}
            />

            <TextField
              variant="outlined"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              sx={{ backgroundColor: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size="large"
                variant="contained"
                sx={{ backgroundColor: "grey" }}
              >
                Sign In
              </Button>
            </CardActions>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

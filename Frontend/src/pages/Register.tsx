import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Stack,
  Box,
  Link,
} from "@mui/material";

const Register = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 4,
          boxShadow: 6,
        }}
      >
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Sign Up for Your Account
          </Typography>

          <Stack spacing={2} mt={3}>
            <TextField label="First Name" fullWidth />
            <TextField label="Last Name" fullWidth />
            <TextField label="Username" fullWidth />
            <TextField label="Email Address" type="email" fullWidth />
            <TextField label="Password" type="password" fullWidth />

            <Typography variant="body2" textAlign="center" mt={2}>
              Already have an account? <Link href="/login">Log in</Link>
            </Typography>
          </Stack>

          <CardActions sx={{ justifyContent: "center", mt: 3 }}>
            <Button variant="contained" size="large">
              Sign Up
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;

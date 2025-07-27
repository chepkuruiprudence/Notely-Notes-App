import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import homepageImg from "../assets/images/homepage.jpg";
import { Link } from "react-router-dom";

const CircleImage = styled("img")({
  width: 200,
  height: 200,
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "16px",
});

const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  width: "100%",
  maxWidth: 300,
  textAlign: "center",
}));

const HomePage = () => {
  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url(${homepageImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
        }}
      >
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{
            textAlign: "center",
            marginBottom: 4,
            color: "white",
            gap: 2
          }}
        >
          <Typography variant="h3" gutterBottom>
            Welcome to Notely
          </Typography>
          <Typography variant="body1" gutterBottom>
            Capture your thoughts, ideas, and tasks effortlessly with Notely.
            Stay organized and inspired.
          </Typography>
          <Button
  variant="contained"
  color="primary"
  size="large"
  component={Link}
  to="/login"
>
  Get Started
</Button>
        </Grid>

        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
        >
          <CircleImage src={homepageImg} alt="Homepage preview" />
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          py: 6,
          px: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: "1000px",
            justifyContent: "space-around",
          }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard elevation={3}>
              <CardContent>
                <Typography variant="h6">1,200+ Notes</Typography>
                <Typography variant="body2">Created by our users</Typography>
              </CardContent>
            </StatCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard elevation={3}>
              <CardContent>
                <Typography variant="h6">97% Satisfaction</Typography>
                <Typography variant="body2">Based on user feedback</Typography>
              </CardContent>
            </StatCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard elevation={3}>
              <CardContent>
                <Typography variant="h6">Fast Sync</Typography>
                <Typography variant="body2">Across all devices</Typography>
              </CardContent>
            </StatCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;

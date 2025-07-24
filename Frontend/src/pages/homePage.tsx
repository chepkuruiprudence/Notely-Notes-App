import { Grid, Typography, Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import homepageImg from "../assets/images/homepage.jpg";
import Notecard from "../components/notecard";

const CircleImage = styled("img")({
  width: 200,
  height: 200,
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "16px",
});

const StatCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: "#f5f5f5",
}));

const HomePage = () => {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        padding: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid
        size={{ xs: 12, sm: 6, md: 4 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Notely
        </Typography>
        <Typography variant="body1">
          Capture your thoughts, ideas, and tasks effortlessly with Notely. Stay
          organized and inspired.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Grid>

      <Grid
        size={{ xs: 12, sm: 6, md: 4 }}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Grid>
          <CircleImage src={homepageImg} alt="Homepage preview" />
        </Grid>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4",
          }}
        >
          <StatCard>
            <CardContent>
              <Typography variant="h6">1,200+ Notes</Typography>
              <Typography variant="body2">Created by our users</Typography>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent>
              <Typography variant="h6">97% Satisfaction</Typography>
              <Typography variant="body2">Based on user feedback</Typography>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent>
              <Typography variant="h6">Fast Sync</Typography>
              <Typography variant="body2">Across all devices</Typography>
            </CardContent>
          </StatCard>
        </Grid>
      </Grid>

      <Notecard />
    </Grid>
  );
};

export default HomePage;

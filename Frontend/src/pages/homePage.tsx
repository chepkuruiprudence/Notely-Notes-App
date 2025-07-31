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
import { Link} from "react-router-dom";
import useUser from "../store/userstore"; // 🔁 your auth hook

const CircleImage = styled("img")({
  width: 200,
  height: 200,
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "16px",
});

const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f5f5f5",
  textAlign: "center",
  height: "150px",
}));

const HomePage = () => {
  const { user } = useUser(); // ✅ Check if logged in

  return (
    <Box>
      <Grid
        container
        sx={{
          padding: 4,
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${homepageImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "80vh",
          textAlign: "center",
          color: "white",
        }}
      >
        <Grid size = {{ xs: 12, sm: 10, md: 8}}>
          <Typography variant="h3" gutterBottom>
            Smart Notes Made Simple
          </Typography>
          <Typography variant="body1" gutterBottom>
            Transform the way you capture, organize, and access your ideas.
            Notely's intelligent note-taking platform helps you stay productive
            and never lose track of important thoughts.
          </Typography>

          <Box mt={4} display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={user ? "/notes" : "/login"}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/notes"
            >
              Explore Notes
            </Button>
          </Box>

          <Box mt={4} display="flex" justifyContent="center">
            <CircleImage src={homepageImg} alt="Hero preview" />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ backgroundColor: "#fff", py: 6, px: 2 }}>
        <Grid container spacing={4} justifyContent="center">
          
          {[
            ["1,200+", "Notes created"],
            ["97%", "User satisfaction"],
            ["24/7", "Sync across devices"],
            ["50+", "Active contributors"],
          ].map(([title, subtitle], index) => (
            <Grid size = {{ xs: 12, sm: 6, md: 3}} key={index}>
              <StatCard elevation={3}>
                <CardContent>
                  <Typography variant="h4">{title}</Typography>
                  <Typography variant="body2">{subtitle}</Typography>
                </CardContent>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;

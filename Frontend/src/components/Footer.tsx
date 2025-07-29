import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1e1e1e",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        color: "white",
        py: 2,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="body2" fontWeight="bold">
            Not-e it down.
          </Typography>

          <Stack direction="row" spacing={3}>
            <MuiLink component={Link} to="/" color="inherit" underline="hover">
              Home
            </MuiLink>
            <MuiLink
              component={Link}
              to="/dashboard"
              color="inherit"
              underline="hover"
            >
              Dashboard
            </MuiLink>
            <MuiLink
              component={Link}
              to="/about"
              color="inherit"
              underline="hover"
            >
              About
            </MuiLink>
            <MuiLink
              component={Link}
              to="/contact"
              color="inherit"
              underline="hover"
            >
              Contact
            </MuiLink>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener"
              sx={{
                color: "white",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.2)", color: "#0A66C2" },
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener"
              sx={{
                color: "white",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.2)", color: "#fff" },
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              href="https://x.com/your-profile"
              target="_blank"
              rel="noopener"
              sx={{
                color: "white",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.2)", color: "#1DA1F2" },
              }}
            >
              <XIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              href="https://facebook.com/your-profile"
              target="_blank"
              rel="noopener"
              sx={{
                color: "white",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.2)", color: "#1877F2" },
              }}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              href="https://instagram.com/your-profile"
              target="_blank"
              rel="noopener"
              sx={{
                color: "white",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.2)", color: "#E1306C" },
              }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Typography variant="caption" sx={{ mt: { xs: 2, sm: 0 } }}>
            &copy; {new Date().getFullYear()} Created by Prudence
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

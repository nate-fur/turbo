import { theme } from "@/providers/Theme";
import { Box, Container, Divider, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: theme?.palette.dark, color: theme?.palette.white, py: 6 }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.15)" }} />
        <Typography variant="caption">© 2025 Snowbus</Typography>
      </Container>
    </Box>
  );
}

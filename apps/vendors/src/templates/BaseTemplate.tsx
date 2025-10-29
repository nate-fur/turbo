import Footer from "@/components/Footer";
import DrawerAppBar from "@/components/TopNav";
import { theme } from "@/providers/Theme";
import { Box } from "@mui/material";

export const BaseTemplate = (props: { children: React.ReactNode }) => {
  return (
    <>
      <DrawerAppBar />
      {/* Background Layer */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          color: theme?.colors.primary,
          backgroundColor: theme?.colors.background,
          backgroundImage: `url(${"http://98.81.68.56:3000/_next/static/media/mainbg.6cd20fa1.svg"})`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
          backgroundPositionY: "top",
          // backgroundSize: 'cover',
          backgroundPosition: "top",
        }}
      />

      {/* Content Layer */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <main>{props.children}</main>
        <Footer />
      </Box>
    </>
  );
};

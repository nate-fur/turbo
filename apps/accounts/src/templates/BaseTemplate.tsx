import Footer from "@/components/Footer";
import { LeftMenu } from "@/components/LeftMenu";
import DrawerAppBar from "@/components/Navigation";
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
          // backgroundImage: `url(${'http://98.81.68.56:3000/_next/static/media/mainbg.6cd20fa1.svg'})`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
          backgroundPositionY: "top",
          // backgroundSize: 'cover',
          backgroundPosition: "top",
        }}
      />

      {/* Content Layer */}

      <Box
        sx={{
          display: "flex",
          position: "relative",
          zIndex: 1,
          minHeight: "93vh",
        }}
      >
        {/* Fixed left sidebar */}
        <Box
          component="aside"
          sx={{
            width: { xs: "240px", md: "240px" },
            flex: "0 0 240px",
            position: "fixed",
            top: 64, // account for AppBar height (approx)
            left: 0,
            bottom: 0,
            overflowY: "auto",
            padding: 2,
          }}
        >
          <LeftMenu />
        </Box>

        {/* Main content — offset by the sidebar width */}
        <Box
          component="main"
          sx={{
            marginLeft: { xs: "240px", md: "240px" },
            width: "calc(100% - 240px)",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Box sx={{ flexGrow: 1, padding: 2 }}>{props.children}</Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

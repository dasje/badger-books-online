import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// import AppTheme from "./shared-theme/AppTheme";
import AppAppBar from "./blog-components/AppAppBar";
import MainContent from "./blog-components/MainContent";
import Latest from "./blog-components/Latest";
import Footer from "./blog-components/Footer";
import Themeify from "./Themeify";

export default function Blog(props: { disableCustomTheme?: boolean }) {
  return (
    <Themeify {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
      <Footer />
    </Themeify>
  );
}

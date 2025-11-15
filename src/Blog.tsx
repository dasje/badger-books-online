import Container from "@mui/material/Container";
import MainContent from "./blog-components/MainContent";
import Latest from "./blog-components/Latest";

export default function Blog(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
    </>
  );
}

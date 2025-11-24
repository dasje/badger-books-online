import Container from "@mui/material/Container";
import Editor from "./Editor";

export default function NewBlog(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <Editor />
      </Container>
    </>
  );
}

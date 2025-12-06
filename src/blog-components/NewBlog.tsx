import Container from "@mui/material/Container";
import Editor from "./Editor";
import { TextField } from "@mui/material";

export default function NewBlog(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <Editor />
      </Container>
    </>
  );
}

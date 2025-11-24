import Container from "@mui/material/Container";
import OverBB from "./core-components/OverBB";
import News from "./core-components/News";
import Markets from "./core-components/Markets";
import Editor from "./blog-components/Editor";

export default function Main() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <News />
        <Markets />
        <OverBB />
      </Container>
    </>
  );
}

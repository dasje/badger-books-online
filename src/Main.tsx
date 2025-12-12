import Container from "@mui/material/Container";
import OverBB from "./core-components/OverBB";
import Markets from "./core-components/Markets";
import News from "./core-components/News";

export default function Main() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <News />
        <Markets />
        <OverBB />
      </Container>
    </>
  );
}

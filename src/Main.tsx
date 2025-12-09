import Container from "@mui/material/Container";
import OverBB from "./core-components/OverBB";
import Markets from "./core-components/Markets";
import { Divider } from "@mui/material";
import News from "./core-components/News";

export default function Main() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Divider sx={{ my: 4 }} />
        <News />
        <Divider sx={{ my: 4 }} />
        <Markets />
        <Divider sx={{ my: 4 }} />
        <OverBB />
      </Container>
    </>
  );
}

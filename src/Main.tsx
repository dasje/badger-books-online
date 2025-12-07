import Container from "@mui/material/Container";
import OverBB from "./core-components/OverBB";
import Markets from "./core-components/Markets";
import { Divider } from "@mui/material";

export default function Main() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {/* <News /> */}
        <Divider sx={{ my: 4 }} />
        <Markets />
        <Divider sx={{ my: 4 }} />
        <OverBB />
      </Container>
    </>
  );
}

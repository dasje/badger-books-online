import Container from "@mui/material/Container";
import OverBB from "./core-components/OverBB";

export default function Main() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <OverBB />
      </Container>
    </>
  );
}

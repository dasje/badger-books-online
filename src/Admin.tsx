import Container from "@mui/material/Container";
import AdminSelect from "./admin-components/AdminSelect";

export default function Admin() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <AdminSelect />
      </Container>
    </>
  );
}

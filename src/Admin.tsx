import Container from "@mui/material/Container";
import AdminSelect from "./admin-components/AdminSelect";
import { Divider } from "@mui/material";

export default function Admin() {
  return (
    <>
      {" "}
      <Divider sx={{ my: 4 }} />
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

import Container from "@mui/material/Container";
import AdminSelect from "./admin-components/AdminSelect";
import { Divider } from "@mui/material";
import { useAuth } from "./db/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
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
        <button onClick={handleLogout}>Logout</button>
      </Container>
    </>
  );
}

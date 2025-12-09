import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import UpcycleIcon from "./UpcycleIcon";
import { Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function AppAppBar() {
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "white",
        mt: "28px",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Button variant="text" color="accent" href="/projects">
            <h2>Projects</h2>
          </Button> */}
          <Link to="/">
            <UpcycleIcon />
          </Link>
          <Button variant="text" color="accent" href="/blog">
            <h2>Blog</h2>
          </Button>
          <Button variant="text" color="accent" href="/workshops">
            <h2>Workshops</h2>
          </Button>
        </Stack>
      </Container>
    </AppBar>
  );
}

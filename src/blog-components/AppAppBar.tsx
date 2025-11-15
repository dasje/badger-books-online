import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import UpcycleIcon from "./UpcycleIcon";
import { Divider, Stack } from "@mui/material";

export default function AppAppBar() {
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
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
          <Button variant="text" color="accent">
            Projects
          </Button>
          <UpcycleIcon />
          <Button variant="text" color="accent">
            Blog
          </Button>
        </Stack>
      </Container>
    </AppBar>
  );
}

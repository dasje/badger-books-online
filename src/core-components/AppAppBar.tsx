import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import UpcycleIcon from "./UpcycleIcon";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ArrowDropDown,
  ArrowDropDownCircle,
  DragHandle,
  MenuBook,
} from "@mui/icons-material";

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "white",
          mt: "28px",
          display: { xs: "block", sm: "none" },
        }}
      >
        <Button onClick={toggleDrawer(true)}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" color="black">
                Badger
              </Typography>
              <UpcycleIcon />
              <Typography variant="h4" color="black">
                Books
              </Typography>
            </Stack>

            <Typography color="black">
              <Stack direction={"row"} sx={{ alignItems: "center" }}>
                <MenuBook />
                Menu
              </Stack>
            </Typography>
          </Stack>
        </Button>

        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
          <List>
            <ListItem disablePadding>
              <Button
                sx={{ minWidth: "66px" }}
                variant="text"
                color="accent"
                href="/"
              >
                <h2>Home</h2>
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button
                sx={{ minWidth: "66px" }}
                variant="text"
                color="accent"
                href="/blog"
              >
                <h2>Blog</h2>
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button
                sx={{ minWidth: "55px" }}
                variant="text"
                color="accent"
                href="https://badgerbooks.nl/"
              >
                <h2>Shop</h2>
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button
                sx={{ minWidth: "140px" }}
                variant="text"
                color="accent"
                href="/workshops"
              >
                <h2>Workshops</h2>
              </Button>
            </ListItem>
          </List>
        </Drawer>
        {/* </Stack> */}
      </AppBar>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "white",
          mt: "28px",
          display: { xs: "none", sm: "block" },
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
            <Container
              sx={{
                display: {
                  xs: "none", // 0px → hides on small screens
                  md: "block", // 900px+ → shows on medium and larger screens
                },
              }}
            >
              <Link to="/">
                <Typography variant="h1" color="black">
                  Badger Books
                </Typography>
              </Link>
            </Container>
            <Button
              sx={{ minWidth: "66px" }}
              variant="text"
              color="accent"
              href="/blog"
            >
              <h2>Blog</h2>
            </Button>
            <Button
              sx={{ minWidth: "55px" }}
              variant="text"
              color="accent"
              href="https://badgerbooks.nl/"
            >
              <h2>Shop</h2>
            </Button>
            <Button
              sx={{ minWidth: "140px" }}
              variant="text"
              color="accent"
              href="/workshops"
            >
              <h2>Workshops</h2>
            </Button>
          </Stack>
        </Container>
      </AppBar>
    </>
  );
}

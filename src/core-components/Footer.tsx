import * as React from "react";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import GitHubIcon from "@mui/icons-material/GitHub";

import { Copyright } from "../components/footer-components/Copyright";
import Subscribe from "../components/footer-components/Subscribe";

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: "center", md: "left" },
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minWidth: { xs: "100%", sm: "60%" },
            }}
          >
            <Subscribe />
          </Box>
          {/* <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Product
            </Typography>
            <Link variant="body2" href="#" color="accent">
              Features
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Company
            </Typography>
            <Link color="accent" variant="body2" href="#">
              About us
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Legal
            </Typography>
            <Link color="accent" variant="body2" href="#">
              Contact
            </Link>
          </Box> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: { xs: 4 },
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <div>
            {/* <Link color="accent" variant="body2" href="#">
              Privacy Policy
            </Link>
            <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="accent" variant="body2" href="#">
              Terms of Service
            </Link> */}
            <Copyright />
          </div>
          {/* <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: "left", color: "text.secondary" }}
          > */}
          <IconButton
            size="small"
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: "center", color: "accent" }}
          >
            <GitHubIcon />
          </IconButton>
          {/* </Stack> */}
        </Box>
      </Container>
    </React.Fragment>
  );
}

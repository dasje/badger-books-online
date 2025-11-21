import * as React from "react";

import Container from "@mui/material/Container";

import fixedSiteContent from "../assets/fixedSiteContent.json";
import { Typography } from "@mui/material";

export default function OverBB() {
  return (
    <Container maxWidth="lg">
      <Typography>
        <h2>{fixedSiteContent.OverBB.Title}</h2>
      </Typography>
      <Typography>{fixedSiteContent.OverBB.Text}</Typography>
    </Container>
  );
}

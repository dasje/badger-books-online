import * as React from "react";

import Container from "@mui/material/Container";

import fixedSiteContent from "../assets/fixedSiteContent.json";
import { Divider, Typography } from "@mui/material";

export default function OverBB() {
  return (
    // <Container maxWidth="lg">
    <>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h2" component="h2" gutterBottom>
        {fixedSiteContent.OverBB.Title}
      </Typography>
      <Typography>{fixedSiteContent.OverBB.Text}</Typography>
    </>
    // </Container>
  );
}

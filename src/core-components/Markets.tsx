import * as React from "react";

import Container from "@mui/material/Container";

import { marketsData } from "../assets/newsData";
import fixedSiteContent from "../assets/fixedSiteContent.json";
import { Typography } from "@mui/material";

export default function Markets() {
  return (
    <>
      <Typography>
        <h2>{fixedSiteContent.News.NewsTitle}</h2>
      </Typography>
      <Typography>{fixedSiteContent.News.NewsText}</Typography>
      {marketsData.map((marketItem, index) => (
        <Container maxWidth="lg" key={index} sx={{ mb: 4 }}>
          <Typography>
            <h3>{marketItem.Market}</h3>
            {marketItem.Date}
          </Typography>
        </Container>
      ))}
    </>
  );
}

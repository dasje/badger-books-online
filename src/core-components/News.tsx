import * as React from "react";

import Container from "@mui/material/Container";

import { newsData } from "../assets/newsData";
import fixedSiteContent from "../assets/fixedSiteContent.json";
import { Typography } from "@mui/material";

export default function News() {
  return (
    <>
      <Typography>
        <h2>{fixedSiteContent.News.NewsTitle}</h2>
      </Typography>
      <Typography>{fixedSiteContent.News.NewsText}</Typography>
      {newsData.map((newsItem, index) => (
        <Container maxWidth="lg" key={index} sx={{ mb: 4 }}>
          <Typography>
            <h3>{newsItem.NewsTitle}</h3>
          </Typography>
          <Typography>{newsItem.NewsText}</Typography>
        </Container>
      ))}
    </>
  );
}

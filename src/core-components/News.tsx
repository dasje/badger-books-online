import * as React from "react";

import Container from "@mui/material/Container";

import { newsData } from "../assets/newsData";
import fixedSiteContent from "../assets/fixedSiteContent.json";
import { Box, CardMedia, Grid, Link, Typography } from "@mui/material";
import { fetchFirst } from "../db/funcs/fetchFirst";
import { WorkshopType } from "../db/types/WorkshopTypes";
import { BlogType } from "../assets/types";

export default function News() {
  const [nextWorkshop, setNextWorkshop] = React.useState<WorkshopType | null>(
    null,
  );
  const [lastBlog, setLastBlog] = React.useState<BlogType | null>(null);

  const workshopFetch = async () => {
    await fetchFirst("workshops").then((data) => {
      setNextWorkshop((data as WorkshopType[])[0]);
    });
  };

  const blogFetch = async () => {
    await fetchFirst("blogs").then((data) => {
      setLastBlog((data as BlogType[])[0]);
    });
  };

  React.useEffect(() => {
    workshopFetch();
    blogFetch();
  }, []);

  return (
    <>
      <Typography>
        <h2>{fixedSiteContent.News.NewsTitle}</h2>
      </Typography>
      <Typography>{fixedSiteContent.News.NewsText}</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {nextWorkshop && (
          <Grid size={6}>
            <Link href={`/workshops`}>
              <Typography variant="h5" color="black" sx={{ margin: 1 }}>
                Check out the next workshop
              </Typography>
              <CardMedia
                sx={{
                  height: 140,
                  opacity: 0.8,
                }}
                image={nextWorkshop.main_img}
                title="Next workshop"
              >
                <Typography
                  variant="h3"
                  color="accent"
                  sx={{ fontWeight: "bold", textShadow: "2px 2px 2px black" }}
                >
                  {nextWorkshop.title}
                </Typography>

                <Typography variant="h6" color="accent" sx={{}}>
                  {nextWorkshop.description}
                </Typography>
              </CardMedia>
            </Link>
          </Grid>
        )}
        {lastBlog && (
          <Grid size={6}>
            <Link href={`/blog/${lastBlog.id}`}>
              <Typography variant="h5" color="black" sx={{ margin: 1 }}>
                Read my last blog
              </Typography>
              <CardMedia
                sx={{
                  height: 140,
                  opacity: 0.8,
                }}
                image={lastBlog.img}
                title="Last blog"
              >
                <Typography
                  variant="h3"
                  color="accent"
                  sx={{ fontWeight: "bold", textShadow: "2px 2px 2px black" }}
                >
                  {lastBlog.title}
                </Typography>

                <Typography variant="h6" color="accent" sx={{}}>
                  {lastBlog.description}
                </Typography>
              </CardMedia>
            </Link>
          </Grid>
        )}
        {/* {lastBlog && <Grid size={6}><Box>{lastBlog.title}</Box></Grid>} */}
        {/* <Grid size={6}>
            <Item>2</Item>
          </Grid>
          <Grid size={6}>
            <Item>3</Item>
          </Grid>
          <Grid size={6}>
            <Item>4</Item>
          </Grid> */}
      </Grid>
    </>
  );
}

import * as React from "react";
import fixedSiteContent from "../assets/fixedSiteContent.json";
import {
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
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
      <Divider sx={{ my: 4 }} />
      <Typography variant="h2" component="h2" gutterBottom>
        {fixedSiteContent.News.NewsTitle}
      </Typography>
      <Typography>{fixedSiteContent.News.NewsText}</Typography>

      <Link href={"https://badgerbooks.nl"} sx={{ mt: "10px" }}>
        <Card variant="outlined" sx={{ mb: "10px" }}>
          <Stack direction={"row"} sx={{ alignItems: "center" }}>
            <Typography variant="h5" sx={{ padding: 2 }}>
              Update:
            </Typography>
            <Typography sx={{ padding: 2, textAlign: "justify" }}>
              Check out my online shop {":)"}
            </Typography>
          </Stack>
        </Card>
      </Link>
      <Card variant="outlined" sx={{ mb: "10px" }}>
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          <Typography variant="h5" sx={{ padding: 2 }}>
            Update:
          </Typography>
          <Typography sx={{ padding: 2, textAlign: "justify" }}>
            From end of January the webshop and this blog site will be merged
            under one domain: badgerbooks.nl. Subscribe below to get an update
            when the inevitable happens.
          </Typography>
        </Stack>
      </Card>
      <Link
        href={
          "https://github.com/Badger-Books/Badger-Books-Public-Domain-Typesets"
        }
      >
        <Card variant="outlined" sx={{ mb: "10px" }}>
          <Stack direction={"row"} sx={{ alignItems: "center" }}>
            <Typography variant="h5" sx={{ padding: 2 }}>
              Update:
            </Typography>
            <Typography sx={{ padding: 2, textAlign: "justify" }}>
              All public domain typesets can be found here. {":)"}
            </Typography>
          </Stack>
        </Card>
      </Link>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {nextWorkshop && (
          <Grid size={6}>
            <Link href={`/workshops`}>
              <Card variant="outlined">
                <Typography variant="h5" color="black" sx={{ margin: 1 }}>
                  Next workshop
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
                    variant="h4"
                    color="accent"
                    sx={{
                      fontWeight: "bold",
                      //   textShadow: "4px 1px black",
                      background: "rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    {nextWorkshop.title}
                  </Typography>

                  <Typography
                    color="black"
                    sx={{ background: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {nextWorkshop.description}
                  </Typography>
                </CardMedia>
              </Card>
            </Link>
          </Grid>
        )}
        {lastBlog && (
          <Grid size={6}>
            <Link href={`/blog/${lastBlog.id}`}>
              <Card variant="outlined">
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
                    color="accent"
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      //   textShadow: "4px 1px black",
                      background: "rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    {lastBlog.title}
                  </Typography>

                  <Typography
                    color="black"
                    sx={{ background: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {lastBlog.description}
                  </Typography>
                </CardMedia>
              </Card>
            </Link>
          </Grid>
        )}

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

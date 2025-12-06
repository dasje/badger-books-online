import Container from "@mui/material/Container";
import Latest from "./blog-components/Latest";
import { cardData } from "./assets/blogCardData";
import BlogContent from "./blog-components/BlogContent";
import fixedSiteContent from "./assets/fixedSiteContent.json";
import { Button } from "@mui/material";
import { BlogType } from "./assets/types";
import { useEffect, useState } from "react";
import { fetchBlogs } from "./db/funcs/fetchBlogs";

export default function Blog(props: { disableCustomTheme?: boolean }) {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  const blogFetch = async () => {
    const data = await fetchBlogs();
    if (Array.isArray(data)) {
      setBlogs(data);
    }
  };

  useEffect(() => {
    blogFetch();
  }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <BlogContent
          title={fixedSiteContent.Blog.BlogTitle}
          byline={fixedSiteContent.Blog.BlogByline}
          cardData={blogs}
        />
        <Latest />

        <Button variant="contained" href="/blog/new">
          Write a New Blog Post
        </Button>
      </Container>
    </>
  );
}

import Container from "@mui/material/Container";
import Latest from "./blog-components/Latest";
import { cardData } from "./assets/blogCardData";
import BlogContent from "./blog-components/BlogContent";
import fixedSiteContent from "./assets/fixedSiteContent.json";
import { Button } from "@mui/material";

export default function Blog(props: { disableCustomTheme?: boolean }) {
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
          cardData={cardData}
        />
        <Latest />

        <Button variant="contained" href="/blog/new">
          Write a New Blog Post
        </Button>
      </Container>
    </>
  );
}

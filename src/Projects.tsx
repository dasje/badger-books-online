import Container from "@mui/material/Container";
import Latest from "./blog-components/Latest";
import BlogContent from "./blog-components/BlogContent";
import { cardData } from "./assets/blogCardData";
import fixedSiteContent from "./assets/fixedSiteContent.json";

export default function Projects(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <BlogContent
          title={fixedSiteContent.Projects.ProjectsTitle}
          byline={fixedSiteContent.Projects.ProjectsByline}
          cardData={cardData}
        />
        <Latest />
      </Container>
    </>
  );
}

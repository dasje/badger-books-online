import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import parse from "html-react-parser";

// import { cardData } from "../assets/blogCardData";
import { useParams } from "react-router-dom";
import { fetchById } from "../db/funcs/fetchById";

export default function BlogEntry() {
  let { blogId } = useParams<string>();
  console.log("blogId", blogId);

  const [blog, setBlog] = React.useState<any>(null);

  const blogFetch = async () => {
    const data = await fetchById("blogs", blogId!);
    if (Array.isArray(data)) {
      setBlog(data[0]);
    }
  };

  React.useEffect(() => {
    blogFetch();
  }, []);

  if (!blog) {
    return <h2>Blog entry not found</h2>;
  }

  const parsedContent = parse(blog.content);

  return (
    <Container maxWidth="md" component="main">
      <Typography variant="h1" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {blog.date}
      </Typography>
      <Typography variant="body1">{parsedContent}</Typography>
    </Container>
  );
}

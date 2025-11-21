import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

import { cardData } from "../assets/blogCardData";
import { useParams } from "react-router-dom";

export default function BlogEntry() {
  let { blogId } = useParams<string>();

  const blog = cardData.find((b) => b.id === blogId);

  if (!blog) {
    return <h2>Blog entry not found</h2>;
  }

  return (
    <Container maxWidth="md" component="main">
      <Typography variant="h1" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {blog.date}
      </Typography>
      <Typography variant="body1">{blog.content}</Typography>
    </Container>
  );
}

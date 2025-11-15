import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

interface BlogEntryProps {
  title: string;
  date: string;
  content: string;
}

export default function BlogEntry(props: BlogEntryProps) {
  return (
    <Container maxWidth="md" component="main">
      <Typography variant="h1" gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {props.date}
      </Typography>
      <Typography variant="body1" paragraph>
        {props.content}
      </Typography>
    </Container>
  );
}

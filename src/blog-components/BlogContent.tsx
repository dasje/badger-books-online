import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { BlogType } from "../assets/types";
import { BlogCard } from "./blogCard/BlogCard";

interface BlogContentProps {
  title: string;
  byline?: string;
  cardData: Array<BlogType>;
}

export default function BlogContent(props: BlogContentProps) {
  const { title, byline, cardData } = props;
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );
  const [blogContent, setBlogContent] =
    React.useState<Array<BlogType>>(cardData);

  React.useEffect(() => {
    console.log("props", cardData);
    setBlogContent(cardData);
  }, [cardData]);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>
        {byline && <Typography>{byline}</Typography>}
      </div>

      {/* 
      // Commented out for future use
      <CategoriesSelect /> */}

      <Grid container spacing={2} columns={12}>
        {blogContent.length > 0 &&
          blogContent.map((item, index) => {
            if (index < 5) {
              return (
                <BlogCard
                  key={index}
                  item={item}
                  focusedCardIndex={focusedCardIndex}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                />
              );
            } else {
              return null;
            }
          })}
      </Grid>
    </Box>
  );
}

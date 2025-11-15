import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// import { CategoriesSelect } from "./CategoriesSelect";
import { BlogCard } from "./card/BlogCard";
import fixedSiteContent from "../assets/fixedSiteContent.json";

interface BlogContentProps {
  title: string;
  byline?: string;
  cardData: Array<{
    id: number;
    img: string;
    tag: string;
    title: string;
    description: string;
    date: string;
    content: string;
  }>;
}

export default function BlogContent(props: BlogContentProps) {
  const { title, byline, cardData } = props;
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

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
        {cardData.map((item, index) => {
          if (index < 5) {
            return index === 0 ? null : (
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

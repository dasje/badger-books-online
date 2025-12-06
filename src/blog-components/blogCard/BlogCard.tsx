import { CardMedia, Grid, Link, Typography } from "@mui/material";
import { StyledCard, StyledCardContent, StyledTypography } from "./cardStyle";
import { useEffect, useState } from "react";
import { BlogType } from "../../assets/types";

interface BlogCardProps {
  focusedCardIndex: number | null;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  item: BlogType;
}

export const BlogCard = (props: BlogCardProps) => {
  const { focusedCardIndex, handleFocus, handleBlur, item } = props;
  //   const [currentItem, setCurrentItem] = useState<BlogType>(item);

  useEffect(() => {
    console.log("b;ah", item);
    //   setCurrentItem(item);
  }, [item]);

  return (
    <Grid size={{ xs: 12, md: 6 }} key={props.focusedCardIndex}>
      <Link href={`/blog/${item.id}`}>
        <StyledCard
          variant="outlined"
          onFocus={() => handleFocus(0)}
          onBlur={handleBlur}
          tabIndex={0}
          className={focusedCardIndex === 0 ? "Mui-focused" : ""}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            image={item.img}
            sx={{
              aspectRatio: "16 / 9",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          />
          <StyledCardContent>
            <Typography gutterBottom variant="caption" component="div">
              {item.tag}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {item.title}
            </Typography>
            <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {item.description}
            </StyledTypography>
          </StyledCardContent>
        </StyledCard>
      </Link>
    </Grid>
  );
};

import { CardMedia, Grid, Link, Typography } from "@mui/material";
import { StyledCard, StyledCardContent, StyledTypography } from "./cardStyle";

interface BlogCardProps {
  focusedCardIndex: number | null;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  item: {
    id: number;
    img: string;
    tag: string;
    title: string;
    description: string;
    date: string;
    content: string;
  };
}

export const BlogCard = (props: BlogCardProps) => {
  const { focusedCardIndex, handleFocus, handleBlur, item } = props;

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Link href={`/blog/${item.id}`} key={props.focusedCardIndex}>
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

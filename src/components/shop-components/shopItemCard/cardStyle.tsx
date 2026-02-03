import { Card, CardContent, styled, Typography } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  marginTop: 10,
  width: "100%",
  //   backgroundColor: (theme.vars || theme).palette.highlight.main,

  // Breakpoints
  [theme.breakpoints.up("md")]: {
    flexDirection: "row", // row on md and larger
    width: "49%",
  },

  "&:hover": {
    backgroundColor: (theme.vars || theme).palette.grey[100],
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
  alignItems: "flex-start",

  // Breakpoints
  [theme.breakpoints.up("md")]: {
    flexDirection: "row", // row on md and larger
  },
}));

export const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

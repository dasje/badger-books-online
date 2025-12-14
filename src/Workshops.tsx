import Container from "@mui/material/Container";
import fixedSiteContent from "./assets/fixedSiteContent.json";
import {
  Box,
  CardMedia,
  Grid,
  Link,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { WorkshopType } from "./db/types/WorkshopTypes";
import { fetchAll } from "./db/funcs/fetchAll";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  marginTop: 10,
  height: "50%",
  width: "100%",
  backgroundColor: (theme.vars || theme).palette.highlight.main,

  // Breakpoints
  [theme.breakpoints.up("md")]: {
    flexDirection: "row", // row on md and larger
  },

  "&:hover": {
    backgroundColor: (theme.vars || theme).palette.highlight.light,
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

function WorkshopCard(props: { item: WorkshopType }) {
  const { item } = props;
  return (
    <Grid size={{ xs: 12, md: 12 }} key={item.id}>
      <Link href={``}>
        <StyledCard
          variant="outlined"
          //   onFocus={() => handleFocus(0)}
          //   onBlur={handleBlur}
          tabIndex={0}
          //   className={focusedCardIndex === 0 ? "Mui-focused" : ""}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            image={item.main_img}
            sx={{
              aspectRatio: "16 / 9",
              borderBottom: "1px solid",
              borderColor: "divider",
              width: "30%",
            }}
          />
          <StyledCardContent>
            <Box sx={{ flexGrow: 1, textAlign: "left" }}>
              <Typography gutterBottom variant="h4" component="div">
                {item.title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {item.description}
              </StyledTypography>
              <div>
                {dayjs(item.date_from).format("DD-MM-YYYY")}
                {dayjs(item.date_to).format("DD-MM-YYYY") !==
                dayjs(item.date_from).format("DD-MM-YYYY")
                  ? ` - ${dayjs(item.date_to).format("DD-MM-YYYY")}`
                  : ""}
              </div>
              <Typography gutterBottom variant="caption" component="div">
                Tags: {item.type}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, position: "sticky", textAlign: "right" }}>
              <Typography gutterBottom variant="h6" component="div">
                Cost:
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                €{item.cost} per person
              </Typography>
            </Box>
          </StyledCardContent>
        </StyledCard>
      </Link>
    </Grid>
  );
}

export default function Workshops() {
  //   const [workshops, setWorkshops] = useState<WorkshopType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [previousWorkshops, setPreviousWorkshops] = useState<WorkshopType[]>(
    [],
  );
  const [upcomingWorkshops, setUpcomingWorkshops] = useState<WorkshopType[]>(
    [],
  );

  const workshopFetch = async () => {
    await fetchAll("workshops").then((data) => {
      const workshops = data as WorkshopType[];

      const now = dayjs(new Date());
      workshops.forEach((workshop) => {
        dayjs(workshop.date_from) >= now
          ? setUpcomingWorkshops([...upcomingWorkshops, workshop])
          : setPreviousWorkshops([...previousWorkshops, workshop]);
      });

      setLoading(false);
    });
  };

  useEffect(() => {
    workshopFetch();
  }, []);

  return (
    <>
      <Divider sx={{ my: 4 }} />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", gap: 4, pb: 5 }}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            {fixedSiteContent.Workshops.WorkshopsTitle}
          </Typography>
          {fixedSiteContent.Workshops.WorkshopsByline && (
            <Typography>
              {fixedSiteContent.Workshops.WorkshopsByline}
            </Typography>
          )}
        </div>
        <div>
          <Typography variant="h5" gutterBottom>
            {fixedSiteContent.Workshops.UpcomingWorkshops}
          </Typography>
          <Typography>
            {fixedSiteContent.Workshops.UpcomingWorkshopsByline}
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {upcomingWorkshops.length === 0 ? (
              <Box sx={{ height: 16 }}>Workshops details TBA </Box>
            ) : (
              upcomingWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} item={workshop} />
              ))
            )}
          </Grid>
        </div>
        <div>
          <Typography variant="h5" gutterBottom>
            {fixedSiteContent.Workshops.PreviousWorkshops}
          </Typography>
          <Typography>
            {fixedSiteContent.Workshops.PreviousWorkshopsByline}
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {previousWorkshops.length === 0 ? (
              <Box sx={{ height: 16 }}>Previous workshops details TBA </Box>
            ) : (
              previousWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} item={workshop} />
              ))
            )}
          </Grid>
        </div>
      </Container>
    </>
  );
}

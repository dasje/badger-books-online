import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { fetchById } from "../../db/funcs/fetchById";
import { useParams } from "react-router-dom";
import { WorkshopType } from "../../db/types/WorkshopTypes";
import { Box, CardMedia, Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { StyledCardContent } from "../../blog-components/blogCard/cardStyle";

export default function WorkshopDetail() {
  let { workshopId } = useParams<string>();

  const [workshop, setWorkshop] = useState<WorkshopType>();

  const workshopFetch = async () => {
    workshopId &&
      (await fetchById("workshops", workshopId).then((data) => {
        const fetchedWorkshop = data as WorkshopType[];
        setWorkshop(fetchedWorkshop[0]);
      }));
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
        {workshop && (
          <>
            <Typography variant="h4">{workshop.title}</Typography>
            <Box
              sx={{
                maxHeight: 300,
                width: "100%",
                overflow: "hidden",
                alignContent: "center",
              }}
            >
              <CardMedia
                component="img"
                alt="workshop image"
                image={workshop.main_img}
                sx={{
                  //   aspectRatio: "16 / 9",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  //   width: "100%",
                }}
              />
            </Box>

            {/* <Grid container alignItems="center"> */}
            <StyledCardContent>
              <Box sx={{ flexGrow: 1, textAlign: "left" }}>
                <Typography textAlign={"left"}>
                  {workshop.description}
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, position: "sticky", textAlign: "right" }}>
                <Typography>Location: {workshop.location}</Typography>
                <Typography sx={{}}>
                  Cost per person: €{workshop.cost}
                </Typography>
                <Typography sx={{}}>
                  Beginning: {dayjs(workshop.date_from).format("DD-MM-YYYY")}
                </Typography>
              </Box>
            </StyledCardContent>
            {/* </Grid> */}
          </>
        )}
      </Container>
    </>
  );
}

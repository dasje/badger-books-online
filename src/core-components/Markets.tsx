import * as React from "react";

import Container from "@mui/material/Container";

import fixedSiteContent from "../assets/fixedSiteContent.json";
import { Divider, Typography } from "@mui/material";
import { MarketType } from "../db/types/MarketTypes";
import { fetchAll } from "../db/funcs/fetchAll";

export default function Markets() {
  const [markets, setMarkets] = React.useState<MarketType[]>([]);
  const marketFetch = async () => {
    await fetchAll("markets").then((data) => {
      setMarkets(data as MarketType[]);
    });
  };

  React.useEffect(() => {
    marketFetch();
  }, []);

  return (
    <>
      {markets.length !== 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h2" component="h2" gutterBottom>
            {fixedSiteContent.Markets.MarketsTitle}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {fixedSiteContent.Markets.MarketsByline}
          </Typography>
          {markets.map((marketItem, index) => (
            <Container maxWidth="lg" key={index} sx={{}}>
              <Typography
                color="accent"
                variant="h6"
                component="h6"
                gutterBottom
              >
                {marketItem.market}, {marketItem.dates}
              </Typography>
            </Container>
          ))}
        </>
      )}
    </>
  );
}

import * as React from "react";

import Container from "@mui/material/Container";

import fixedSiteContent from "../assets/fixedSiteContent.json";
import { Typography } from "@mui/material";
import { fetchMarkets } from "../db/funcs/fetchMarkets";
import { MarketType } from "../db/types/MarketTypes";

export default function Markets() {
  const [markets, setMarkets] = React.useState<MarketType[]>([]);
  const marketFetch = async () => {
    await fetchMarkets().then((data) => {
      setMarkets(data as MarketType[]);
    });
  };

  React.useEffect(() => {
    marketFetch();
  }, []);

  return (
    <>
      <Typography variant="h2" component="h2" gutterBottom>
        {fixedSiteContent.Markets.MarketsTitle}
      </Typography>
      <Typography>{fixedSiteContent.Markets.MarketsByline}</Typography>
      {markets.map((marketItem, index) => (
        <Container maxWidth="lg" key={index} sx={{}}>
          <Typography color="accent">
            <h3>
              {marketItem.market},{marketItem.dates}
            </h3>
          </Typography>
        </Container>
      ))}
    </>
  );
}

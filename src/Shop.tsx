import { Container } from "@mui/material";
import { ItemType } from "./db/types/ItemType";
import { fetchAll } from "./db/funcs/fetchAll";
import { useEffect, useState } from "react";
import WebshopContent from "./components/shop-components/WebshopContent";
import fixedSiteContent from "./assets/fixedSiteContent.json";

export default function Shop(props: { disableCustomTheme?: boolean }) {
  const [shopItems, setShopItems] = useState<ItemType[]>([]);

  const productsFetch = async () => {
    const data = await fetchAll("products");
    if (Array.isArray(data)) {
      setShopItems(data);
    }
  };

  useEffect(() => {
    productsFetch();
  }, []);
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 5 }}
      >
        <WebshopContent
          title={fixedSiteContent.Webshop.WebshopTitle}
          byline={fixedSiteContent.Webshop.WebshopByline}
          cardData={shopItems}
        />
      </Container>
    </>
  );
}

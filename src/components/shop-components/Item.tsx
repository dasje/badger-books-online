import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { BasketItemType } from "./shop-types/BasketItemType";
import { ItemType } from "../../db/types/ItemType";
import {
  checkItemInBasket,
  removeItemFromBasket,
  updateBasketContents,
} from "./funcs/updateBasket";

interface ItemProps {
  item: ItemType;
  basket: BasketItemType;
  updateBasket: Dispatch<SetStateAction<BasketItemType>>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Item(props: ItemProps) {
  const { item, basket, updateBasket } = props;
  return (
    <Container>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Product details
      </Typography>
      <Typography variant="h4" sx={{ mt: 2, mb: 4 }}>
        {item.title}
      </Typography>
      <Box sx={{ float: "right", width: "50%" }}>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" sx={{ mt: 2 }}>
          {item.currency === "EUR" ? "€" : item.currency}
          {item.price}
        </Typography>
        {checkItemInBasket(basket, item) !== -1 ? (
          <Button
            variant="contained"
            color="warning"
            sx={{ mt: 4 }}
            onClick={() => updateBasket(removeItemFromBasket(basket, item))}
          >
            Remove item from basket
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => updateBasket(updateBasketContents(basket, item))}
          >
            Add to Basket
          </Button>
        )}
      </Box>
      <Box sx={{ float: "left", width: "40%" }}>
        <CardMedia
          component="img"
          alt="img alt text"
          image={item.image_url}
          sx={{
            aspectRatio: "9 / 9",
            borderBottom: "1px solid",
            width: "100%",
            overflow: "hidden",
          }}
        />
      </Box>
    </Container>
  );
}

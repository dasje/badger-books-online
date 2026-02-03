import { Box, Button, CardMedia, Grid, Modal, Typography } from "@mui/material";
import { StyledCard, StyledCardContent, StyledTypography } from "./cardStyle";

import { Dispatch, useState } from "react";
import {
  AddShoppingCart,
  HelpOutline,
  RemoveShoppingCart,
} from "@mui/icons-material";
import Item from "../Item";
import { ItemType } from "../../../db/types/ItemType";
import { BasketItemType } from "../shop-types/BasketItemType";
import { checkItemInBasket } from "../funcs/updateBasket";

interface ItemCardProps {
  focusedCardIndex: number | null;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  item: ItemType;
  basket: BasketItemType;
  updateBasket: Dispatch<React.SetStateAction<BasketItemType>>;
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

export const ShopItemCard = (props: ItemCardProps) => {
  const {
    focusedCardIndex,
    handleFocus,
    handleBlur,
    item,
    basket,
    updateBasket,
  } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Item item={item} basket={basket} updateBasket={updateBasket} />
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ mt: 4, mr: 4, position: "fixed", right: 0, top: 0 }}
          >
            Close Item
          </Button>
        </Box>
      </Modal>
      <StyledCard
        key={item.id}
        variant="outlined"
        onFocus={() => handleFocus(0)}
        onBlur={handleBlur}
        tabIndex={0}
        className={focusedCardIndex === 0 ? "Mui-focused" : ""}
        sx={{ position: "relative" }}
      >
        {checkItemInBasket(basket, item) !== -1 ? (
          <Button
            variant="outlined"
            sx={{ padding: 0, position: "absolute", bottom: 16, right: 16 }}
            onClick={() =>
              updateBasket((prev) => prev.filter((i) => i.item.id !== item.id))
            }
          >
            <RemoveShoppingCart
              fontSize="large"
              color="warning"
              sx={{ textAlign: "right", color: "primary.main" }}
            />
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{ padding: 0, position: "absolute", bottom: 16, right: 16 }}
            size="small"
            onClick={() =>
              updateBasket((prev) => [...prev, { item, quantity: 1 }])
            }
          >
            <AddShoppingCart
              fontSize="large"
              sx={{ textAlign: "right", color: "primary.main" }}
            />
          </Button>
        )}
        <Box onClick={handleOpen}>
          <CardMedia
            component="img"
            alt="img alt text"
            image={item.image_url}
            sx={{
              aspectRatio: "9 / 9",
              borderBottom: "1px solid",
              borderColor: "divider",
              width: "100%",
            }}
          />
          <StyledCardContent>
            <Box sx={{ flexGrow: 1, textAlign: "left" }}>
              <Typography gutterBottom variant="h4" component="div">
                {item.title}{" "}
                <HelpOutline fontSize="small" sx={{ color: "primary.main" }} />
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {item.description}
              </StyledTypography>

              {item.tags && item.tags.length >= 1 && (
                <Typography gutterBottom variant="caption" component="div">
                  Tags: {item.tags?.join(", ")}
                </Typography>
              )}
            </Box>
            <Box sx={{ flexGrow: 1, position: "sticky", textAlign: "right" }}>
              <Typography gutterBottom variant="h6" component="div">
                {item.currency === "EUR" ? "€" : item.currency}
                {item.price}
              </Typography>
            </Box>
          </StyledCardContent>
        </Box>
      </StyledCard>
    </>
  );
};

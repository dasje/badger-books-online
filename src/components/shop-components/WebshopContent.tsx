import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ItemType } from "../../db/types/ItemType";
import { ShopItemCard } from "./shopItemCard/ShopItemCard";
import { Badge, Box, Button, Divider, Modal } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Basket from "./Basket";
import { BasketItemType } from "./shop-types/BasketItemType";

interface WebshopContentProps {
  title: string;
  byline?: string;
  cardData: Array<ItemType>;
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
  overflow: "scroll",
};

export default function WebshopContent(props: WebshopContentProps) {
  const { title, byline, cardData } = props;
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );
  const [basket, setBasket] = React.useState<BasketItemType>([]);
  const [webshopContent, setWebshopContent] =
    React.useState<Array<ItemType>>(cardData);

  React.useEffect(() => {
    setWebshopContent(cardData);
    console.log("WebshopContent - cardData updated:", cardData);
  }, [cardData]);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Divider sx={{ my: 4 }} />

      {/* // Basket Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Basket basket={basket} updateBasket={setBasket} />
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ mt: 4, mr: 4, position: "fixed", right: 0, top: 0 }}
          >
            Close Basket
          </Button>
        </Box>
      </Modal>

      {/* // Header with Title, Byline and Basket Button */}
      <Grid
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}
      >
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <div>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            {byline && <Typography>{byline}</Typography>}
          </div>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            textAlign: "right",
            paddingRight: 8,
            paddingTop: 3,
          }}
          onClick={handleOpen}
        >
          <Badge
            badgeContent={basket.reduce((sum, item) => sum + item.quantity, 0)}
            color="primary"
          >
            <Button variant="outlined">
              <ShoppingCartIcon fontSize="large" />
            </Button>
          </Badge>
        </Box>
      </Grid>

      {/* // Shop Item Cards */}
      <Grid
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}
      >
        {webshopContent.length > 0 ? (
          webshopContent.map((item, index) => {
            return (
              <ShopItemCard
                key={index}
                item={item}
                focusedCardIndex={focusedCardIndex}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                basket={basket}
                updateBasket={setBasket}
              />
            );
          })
        ) : (
          <Typography>No items found.</Typography>
        )}
      </Grid>
    </>
  );
}

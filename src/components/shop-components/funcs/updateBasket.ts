// check item is not already in basket
// if it is, increase quantity
// if not, add item with quantity 1

import { BasketItemType } from "../shop-types/BasketItemType";
import { ItemType } from "../../../db/types/ItemType";

export function checkItemInBasket(
  basket: BasketItemType,
  item: ItemType,
): number {
  return basket.findIndex((basketItem) => basketItem.item.id === item.id);
}

export function updateBasketContents(
  basket: BasketItemType,
  item: ItemType,
): BasketItemType {
  const itemIndex = checkItemInBasket(basket, item);

  if (itemIndex !== -1) {
    // Item is already in basket, increase quantity
    const updatedBasket = [...basket];
    updatedBasket[itemIndex].quantity += 1;
    return updatedBasket;
  } else {
    // Item is not in basket, add it with quantity 1
    return [...basket, { item, quantity: 1 }];
  }
}

export function removeItemFromBasket(
  basket: BasketItemType,
  item: ItemType,
): BasketItemType {
  const itemIndex = checkItemInBasket(basket, item);
  if (itemIndex !== -1) {
    const updatedBasket = [...basket];
    updatedBasket.splice(itemIndex, 1);
    return updatedBasket;
  }
  return basket;
}

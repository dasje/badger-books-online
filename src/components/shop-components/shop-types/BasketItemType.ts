import { ItemType } from "../../../db/types/ItemType";

export type BasketItemType = {
  item: ItemType;
  quantity: number;
}[];

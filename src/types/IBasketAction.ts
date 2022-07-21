import { IBasketItem } from "./IBasket";

export interface IBasketAction {
  readonly type: "ADD" | "REMOVE" | "SET_QUANTITY" | "CLEAR_BASKET";
  readonly item?: IBasketItem;
  readonly id?: number;
  readonly quantity?: number;
  readonly directRemove?: boolean;
}

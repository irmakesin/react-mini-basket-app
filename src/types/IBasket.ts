import { IProduct } from "./IProduct";

export type IBasketItem = IProduct & {
  readonly quantity: number;
};

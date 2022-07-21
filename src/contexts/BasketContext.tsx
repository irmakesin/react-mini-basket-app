import * as React from "react";
import { IBasketItem } from "../types/IBasket";
import { IBasketAction } from "../types/IBasketAction";

interface IContext {
  readonly state: IBasketItem[];
  readonly dispatch: React.Dispatch<IBasketAction>;
}

export const BasketContext = React.createContext<IContext>({
  state: [],
  dispatch: () => {},
});

const basketReducer = (
  state: IBasketItem[],
  action: IBasketAction
): IBasketItem[] => {
  switch (action.type) {
    case "ADD":
      const itemForCreate = state.find((item) => item.id === action.item?.id);
      if (itemForCreate) {
        return state.map((item) =>
          item.id === action.item?.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, action.item!];

    case "REMOVE":
      const itemForRemove = state.find((item) => item.id === action.item?.id);
      if (itemForRemove?.quantity != 1 && !action.directRemove) {
        return state.map((item) =>
          item.id === action.item?.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return state.filter((basketItem) => basketItem.id !== action.item?.id);

    case "SET_QUANTITY":
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: action?.quantity! } : item
      );

    case "CLEAR_BASKET":
      return [];

    default:
      return state;
  }
};

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(basketReducer, []);

  return (
    <BasketContext.Provider value={{ state, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
};

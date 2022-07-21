import * as React from "react";
import { IBasketItem } from "../../../types/IBasket";
import "../../../styles/BasketItem.scss";
import { BasketContext } from "../../../contexts/BasketContext";
import { getPriceWithSymbols } from "../../../utils/ItemUtils";

interface BasketItemProps {
  readonly item: IBasketItem;
}

export const BasketItem: React.FC<BasketItemProps> = ({ item }) => {
  const { dispatch } = React.useContext(BasketContext);

  const handleIncreaseQuantity = () => {
    dispatch({
      type: "REMOVE",
      item: item,
    });
  };
  const handleDecreaseQuantity = () => {
    dispatch({
      type: "ADD",
      item: item,
    });
  };
  const handleRemoveItem = () => {
    dispatch({
      type: "REMOVE",
      item: item,
      directRemove: true,
    });
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch({
      type: "SET_QUANTITY",
      id: item.id,
      quantity: +value,
    });
  };

  return (
    <div className="basket-item">
      <div className="basket-item__left">
        <img src={item.image} alt="" className="basket-item__left__image" />
        <div className="basket-item__left__actions">
          <button
            className="basket-item__left__actions__action-button"
            onClick={handleIncreaseQuantity}
          >
            -
          </button>
          <input
            type="text"
            className="basket-item__left__actions__action-input"
            value={item.quantity}
            onChange={handleChangeQuantity}
          />
          <button
            className="basket-item__left__actions__action-button"
            onClick={handleDecreaseQuantity}
          >
            +
          </button>
        </div>
      </div>

      <div className="basket-item__right">
        <div className="basket-item__right__name">{item.name}</div>
        <div className="basket-item__right__price">
          {getPriceWithSymbols(item.currency, item.price)}
        </div>

        <button
          className="basket-item__right__remove__button"
          onClick={handleRemoveItem}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

import * as React from "react";
import { IProduct } from "../../../types/IProduct";
import "../../../styles/Product.scss";
import { BasketContext } from "../../../contexts/BasketContext";
import { useNavigate } from "react-router-dom";
import { getPriceWithSymbols } from "../../../utils/ItemUtils";

interface ProductProps {
  readonly product: IProduct;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const { dispatch } = React.useContext(BasketContext);
  const navigation = useNavigate();

  const handleAddToBasket = () => {
    dispatch({
      type: "ADD",
      item: { ...product, quantity: 1 },
    });
    navigation("/basket");
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.name} className="product__image" />
      <div className="product__name">{product.name}</div>

      <div className="row">
        <div className="product__price">
          {getPriceWithSymbols(product.currency, product.price)}
        </div>
        <button
          className="product__add-basket-button"
          onClick={handleAddToBasket}
        >
          ADD BASKET
        </button>
      </div>
    </div>
  );
};

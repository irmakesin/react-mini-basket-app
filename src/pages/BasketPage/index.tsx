import * as React from "react";
import { BasketContext } from "../../contexts/BasketContext";
import { BasketItem } from "./components/BasketItem";
import "../../styles/BasketPage.scss";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface BasketPageProps {}

export const BasketPage: React.FC<BasketPageProps> = () => {
  const { state, dispatch } = React.useContext(BasketContext);
  const [error, setError] = React.useState<AxiosError | null>(null);
  const [success, setSuccess] = React.useState(false);

  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate("/");
  };

  const handlePlaceOrder = () => {
    const data = state.map((item) => ({
      id: item.id,
      amount: item.quantity,
    }));
    setError(null);
    setSuccess(false);
    axios
      .post("https://glass-functional-song.glitch.me/order", data)
      .then((res) => {
        console.log(res);
        dispatch({ type: "CLEAR_BASKET" });
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };
  return (
    <div className="basket">
      <div className="basket__title">MY CART ({state.length})</div>

      <div className="basket__info-message">
        {success && (
          <div className="basket__info-message__success">
            Order placed successfully!
          </div>
        )}

        {error && (
          <div className="basket__info-message__error">
            {error.message.includes("404") ? "Out Of Stock" : error.message}{" "}
          </div>
        )}
      </div>

      {state.map((basketItem) => (
        <BasketItem key={basketItem.id} item={basketItem} />
      ))}
      <div className="basket__footer">
        <button className="basket__footer__button" onClick={handleBackToList}>
          {"<"} CONTINUE SHOPPING
        </button>
        <button className="basket__footer__button" onClick={handlePlaceOrder}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

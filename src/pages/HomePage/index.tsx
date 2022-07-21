import * as React from "react";
import axios from "axios";
import { Product } from "./components/Product";
import { IProduct } from "../../types/IProduct";
import "../../styles/HomePage.scss";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  const [listings, setListings] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    axios
      .get("https://glass-functional-song.glitch.me/listing")
      .then((res) => setListings(res.data));
  }, []);

  return (
    <div className="container">
      {listings.map((item) => (
        <Product key={item.id} product={item} />
      ))}
    </div>
  );
};

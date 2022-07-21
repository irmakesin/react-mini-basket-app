export const getPriceWithSymbols = (
  currency: string,
  price: string
): string => {
  const symbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    TRY: "₺",
  };
  const symbol = symbols[currency];
  return `${symbol} ${price}`;
};

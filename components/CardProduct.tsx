import React from "react";

interface ICardProduct {
  name: string;
  type: string;
  prices: {
    priceFor: string;
    price: number;
  }[];
}

function CardProduct({ ...product }: ICardProduct): JSX.Element {
  return (
    <div className="bg-white drop-shadow-md rounded-md hover:scale-105 transition-all">
      <div className="w-100 h-32 bg-orange-600 rounded-t-md flex justify-center items-center">
        <span className="text-4xl text-white">HT</span>
      </div>
      <div className="p-2">
        <span>{product.name}</span>
        <p>{product.type}</p>
        <p>
          {product.prices
            .filter(({ priceFor }) => priceFor === "regular")
            .map(({ price }) => price)}
        </p>
      </div>
    </div>
  );
}

export default CardProduct;

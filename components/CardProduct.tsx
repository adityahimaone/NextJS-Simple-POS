import React from "react";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addCart } from "@/store/cartSlice";

interface ICardProduct {
  id: string | number;
  name: string;
  type: string;
  prices: {
    priceFor: string;
    price: number;
  }[];
}

function CardProduct({ ...product }: ICardProduct): JSX.Element {
  const dispatch = useAppDispatch();
  const { name, type, prices } = product;
  const thumbnailName = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleAddCart = () => {
    dispatch(addCart({ product, amount: 1 }));
  };

  return (
    <div
      className="bg-white drop-shadow-md rounded-md hover:scale-105 transition-all cursor-pointer overflow-hidden"
      onClick={handleAddCart}
    >
      <div className="w-100 h-32 bg-orange-600 flex justify-center items-center">
        <span className="text-4xl text-white">{thumbnailName}</span>
      </div>
      <div className="p-2">
        <span>{name}</span>
        <p>{type}</p>
        <p>
          {prices
            .filter(({ priceFor }) => priceFor === "regular")
            .map(({ price }) => price)}
        </p>
      </div>
    </div>
  );
}

export default CardProduct;

import React from 'react';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addCart } from '@/store/cartSlice';
import transformCurrency from '@/utils/helper/transformCurrency';

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
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const handleAddCart = () => {
    dispatch(addCart({ product, amount: 1 }));
  };

  let newPrice = prices.filter(({ priceFor }) => priceFor === 'regular').map(({ price }) => price)[0];
  if (newPrice === undefined) {
    newPrice = 0;
  }

  return (
    <div
      className="bg-white drop-shadow-md rounded-md hover:scale-105 transition-all cursor-pointer overflow-hidden"
      onClick={handleAddCart}
    >
      <div className="w-100 h-32 bg-orange-600 flex justify-center items-center">
        <span className="text-4xl text-white">{thumbnailName}</span>
      </div>
      <div className="p-2">
        <span className="text-base font-semibold">{name}</span>
        <p className="text-sm text-gray-700">{type}</p>
        <p>{transformCurrency(newPrice)}</p>
      </div>
    </div>
  );
}

export default CardProduct;

import { useId } from "react";

import { IProduct } from "./Types";

export const Products: IProduct[] = [
  {
    id: 1,
    name: "oval hat",
    type: "hats",
    prices: [
      {
        priceFor: "regular",
        price: 20000,
      },
      {
        priceFor: "VIP",
        price: 15000,
      },
    ],
  },
  {
    id: 2,
    name: "square hat",
    type: "hats",
    prices: [
      {
        priceFor: "regular",
        price: 30000,
      },
      {
        priceFor: "VIP",
        price: 20000,
      },
      {
        priceFor: "wholesale",
        price: 15000,
      },
    ],
  },
  {
    id: 3,
    name: "magic shirt",
    type: "tops",
    prices: [
      {
        priceFor: "regular",
        price: 50000,
      },
    ],
  },
];

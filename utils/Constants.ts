import { useId } from 'react';

import { IProduct, IOption } from './Types';

export const Product: IProduct = {
  id: 0,
  name: '',
  type: '',
  prices: [
    {
      priceFor: '',
      price: 0,
    },
  ],
};

export const OptionsBuyer: IOption[] = [
  { value: 'regular', label: 'Regular' },
  { value: 'VIP', label: 'VIP' },
  { value: 'wholesale', label: 'Wholesale' },
];

export const OptionsProductType: IOption[] = [
  { value: 'hats', label: 'Hats' },
  { value: 'tops', label: 'Tops' },
  { value: 'shorts', label: 'Shorts' },
];

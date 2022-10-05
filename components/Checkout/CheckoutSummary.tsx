import React from 'react';

import { IProduct, ICheckoutData } from '@/utils/Types';
import transformCurrency from '@/utils/helper/transformCurrency';

interface ICheckoutSummary {
  product: IProduct;
  price: number;
  amount: number;
  checkoutData: ICheckoutData;
}

function CheckoutSummary({ product, price, amount, checkoutData }: ICheckoutSummary): JSX.Element {
  const { name, type } = product;
  const { total, buyer } = checkoutData;

  return (
    <div className="space-y-2">
      <div>
        <h5 className="text-lg font-semibold">Info User</h5>
        <div className="grid grid-cols-3 gap-x-3 gap-y-1">
          <div className="col-span-1">Buyer Type</div>
          <div className="col-span-2"> : {buyer.type}</div>
        </div>
      </div>
      <div>
        <h5 className="text-lg font-semibold">Summary</h5>
        <div className="grid grid-cols-3 gap-x-3 gap-y-1">
          <div className="col-span-1">Name Product</div>
          <div className="col-span-2"> : {name}</div>
          <div className="col-span-1">Type Product </div>
          <div className="col-span-2"> : {type}</div>
          <div className="col-span-1">Price per Item</div>
          <div className="col-span-2"> : {transformCurrency(price)}</div>
          <div className="col-span-1">Number of Items</div>
          <div className="col-span-2"> : {amount}</div>
        </div>
      </div>
      <div>
        <h5 className="text-xl font-semibold">Total</h5>
        <p className="text-lg">{transformCurrency(total)}</p>
      </div>
    </div>
  );
}

export default CheckoutSummary;

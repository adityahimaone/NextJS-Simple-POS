import React, { forwardRef } from 'react';

import { ICheckoutData, IProduct } from '@/utils/Types';
import transformCurrency from '@/utils/helper/transformCurrency';

interface ILayoutPrint {
  product: IProduct;
  price: number;
  amount: number;
  data: ICheckoutData;
}

const LayoutPrint = forwardRef<HTMLDivElement, ILayoutPrint>(({ product, price, amount, data }, ref) => {
  const { name, type } = product;
  const { total, buyer } = data;
  return (
    <div ref={ref} className="p-5 w-full">
      <div className="font-semibold text-center">
        <h5 className="text-xl">Invoice</h5>
        <h6 className="text-lg">The Islander Shop (TIS)</h6>
        <div className="border-b border-black" />
      </div>
      <div className="mt-3 space-y-2">
        <div>
          <h6 className="text-base font-medium">Buyer</h6>
          <table className="table-auto w-full">
            <tr>
              <td className="w-1/3">Name Buyer</td>
              <td className="w-2/3"> : {buyer.name}</td>
            </tr>
            <tr>
              <td>Type Buyer </td>
              <td> : {buyer.type}</td>
            </tr>
          </table>
        </div>
        <div>
          <h6 className="text-base font-medium">Product</h6>
          <table className="table-auto w-full">
            <tr>
              <td className="w-1/3">Name Product</td>
              <td className="w-2/3"> : {name}</td>
            </tr>
            <tr>
              <td>Type Product </td>
              <td> : {type}</td>
            </tr>
            <tr>
              <td>Price per Item </td>
              <td> : {transformCurrency(price)}</td>
            </tr>
            <tr>
              <td>Number of Items </td>
              <td> : {amount}</td>
            </tr>
          </table>
        </div>
        <div>
          <h5 className="text-xl font-semibold">Total</h5>
          <p className="text-lg">{transformCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
});

export default LayoutPrint;

import React from "react";

import { IProduct, ICheckoutData } from "@/utils/Types";

interface ICheckoutSummary {
  product: IProduct;
  price: number;
  amount: number;
  checkoutData: ICheckoutData;
}

function CheckoutSummary({
  product,
  price,
  amount,
  checkoutData,
}: ICheckoutSummary): JSX.Element {
  const { name, type } = product;
  const { total, buyer } = checkoutData;

  return (
    <div className="space-y-2">
      <div>
        <h5 className="text-lg font-semibold">Info User</h5>
        <table className="table-auto w-full">
          <tr>
            <td className="w-1/3">Buyer Type</td>
            <td className="w-2/3"> : {buyer.type}</td>
          </tr>
        </table>
      </div>
      <div>
        <h5 className="text-lg font-semibold">Summary</h5>
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
            <td> : {price}</td>
          </tr>
          <tr>
            <td>Number of Items </td>
            <td> : {amount}</td>
          </tr>
        </table>
      </div>
      <div>
        <h5 className="text-xl font-semibold">Total</h5>
        <p className="text-lg">{total}</p>
      </div>
    </div>
  );
}

export default CheckoutSummary;

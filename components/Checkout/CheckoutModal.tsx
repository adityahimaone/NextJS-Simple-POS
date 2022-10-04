import React, { useEffect, useState } from "react";

import Modal from "../UI/Modal";
import InputText from "../UI/Form/InputText";
import InputSelect from "../UI/Form/InputSelect";
import { OptionsBuyer, Product } from "@/utils/Constants";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getDataBuyers } from "@/store/buyerSlice";
import { ICheckoutData } from "@/utils/Types";
import CheckoutSummary from "./CheckoutSummary";
import Button from "../UI/Form/Button";

function Checkout({ onClose }: { onClose: () => void }): JSX.Element {
  const dispatch = useAppDispatch();

  const buyers = useAppSelector((state) => state.buyers);
  const carts = useAppSelector((state) => state.carts);
  const { product, amount } = carts.data;

  const defaultPrice = product.prices.filter(
    (price) => price.priceFor === "regular"
  )[0].price;

  const [price, setPrice] = useState(defaultPrice);
  const [checkoutData, setCheckoutData] = useState<ICheckoutData>({
    buyer: {
      id: "",
      name: "",
      type: "regular",
    },
    product: product ? product : ({} as typeof Product),
    amount: amount ? amount : 0,
    total: 0,
  });

  useEffect(() => {
    const buyerType = checkoutData.buyer.type;
    const newPrice = product.prices.filter(
      (price) => price.priceFor === buyerType
    )[0]?.price;
    console.log(newPrice, "newPrice");
    if (newPrice === undefined) {
      setPrice(defaultPrice);
    } else {
      setPrice(newPrice);
    }
  }, [checkoutData.buyer]);

  useEffect(() => {
    const newTotal = price * amount;
    setCheckoutData({
      ...checkoutData,
      total: newTotal,
    });
  }, [price]);

  useEffect(() => {
    dispatch(getDataBuyers());
  }, []);

  const options = buyers.data.map((buyer) => ({
    value: buyer.id,
    label: buyer.name,
  }));

  const onChangeSelectBuyer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const buyerId = e.target.value;
    const buyer = buyers.data.find((buyer) => buyer.id.toString() === buyerId);
    console.log(buyer, buyerId);
    if (buyer) {
      setCheckoutData({
        ...checkoutData,
        buyer: {
          id: buyer.id,
          name: buyer.name,
          type: buyer.type,
        },
      });
    }
  };

  console.log(checkoutData, "checkoutData");

  return (
    <Modal onClose={onClose} title="Checkout">
      <div>
        <InputSelect
          name="type"
          label="Select Buyer"
          options={options}
          value={checkoutData.buyer.id}
          onChange={onChangeSelectBuyer}
        />
      </div>
      <CheckoutSummary
        product={product}
        price={price}
        amount={amount}
        checkoutData={checkoutData}
      />
      <div className="flex justify-end">
        <Button>Generate Invoice</Button>
      </div>
    </Modal>
  );
}

export default Checkout;

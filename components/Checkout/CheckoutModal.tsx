import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import classNames from 'classnames';

import Modal from '../UI/Modal';
import InputText from '../UI/Form/InputText';
import InputSelect from '../UI/Form/InputSelect';
import { Product } from '@/utils/Constants';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getDataBuyers } from '@/store/buyerSlice';
import { postDataTransaction } from '@/store/transactionsSlice';
import { ICheckoutData } from '@/utils/Types';
import CheckoutSummary from './CheckoutSummary';
import Button from '../UI/Form/Button';
import CheckoutPrint from './CheckoutPrint';

interface ICheckout {
  onClose: () => void;
}

function Checkout({ onClose }: ICheckout): JSX.Element {
  const dispatch = useAppDispatch();
  const componentPrintRef = useRef<HTMLDivElement>(null);

  const buyers = useAppSelector((state) => state.buyers);
  const carts = useAppSelector((state) => state.carts);
  const { product, amount } = carts.data;

  const defaultPrice = product.prices.filter((price) => price.priceFor === 'regular')[0].price;

  const [showPrintLayout, setShowPrintLayout] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(defaultPrice);
  const [checkoutData, setCheckoutData] = useState<ICheckoutData>({
    buyer: {
      id: '',
      name: '',
      type: 'regular',
    },
    product: product ? product : ({} as typeof Product),
    amount: amount ? amount : 0,
    total: 0,
  });

  useEffect(() => {
    const buyerType = checkoutData.buyer.type;
    const newPrice = product.prices.filter((price) => price.priceFor === buyerType)[0]?.price;
    console.log(newPrice, 'newPrice');
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

  const handlePrint = useReactToPrint({
    content: () => componentPrintRef.current,
  });

  const showHideClass = classNames({
    hidden: !showPrintLayout,
    block: showPrintLayout,
  });

  const handleSubmit = () => {
    setShowPrintLayout(true);
    const id = Math.floor(Math.random() * 1000000000);
    dispatch(
      postDataTransaction({
        id: id,
        item: checkoutData.product.name,
        qty: checkoutData.amount,
        buyer: checkoutData.buyer.name,
      }),
    );
    handlePrint();
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} title="Checkout">
        <form onSubmit={handleSubmit}>
          <div>
            <InputSelect
              name="type"
              label="Select Buyer"
              options={options}
              value={checkoutData.buyer.id}
              onChange={onChangeSelectBuyer}
            />
          </div>
          <CheckoutSummary product={product} price={price} amount={amount} checkoutData={checkoutData} />
          <div className="flex justify-end">
            <Button type="submit">Generate Invoice</Button>
          </div>
        </form>
      </Modal>
      <div className={showHideClass}>
        <CheckoutPrint product={product} price={price} amount={amount} data={checkoutData} ref={componentPrintRef} />
      </div>
    </>
  );
}

export default Checkout;

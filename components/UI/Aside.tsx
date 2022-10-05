import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addCart, removeCart } from '@/store/cartSlice';
import Button from './Form/Button';
import ButtonIcon from './Form/ButtonIcon';
import transformCurrency from '@/utils/helper/transformCurrency';

interface IAside {
  onShowModal: () => void;
}

function Aside({ onShowModal }: IAside): JSX.Element {
  const dispatch = useAppDispatch();

  const carts = useAppSelector((state) => state.carts);
  const { product, amount } = carts.data;

  const addAmountCart = () => {
    dispatch(addCart({ product, amount: 1 }));
  };

  const removeAmountCart = () => {
    dispatch(removeCart({ amount: 1 }));
  };

  console.log(carts);
  const initPricePerItem = product.prices.filter((price) => price.priceFor === 'regular')[0]?.price;
  const totalPrice = initPricePerItem * amount;

  return (
    <aside className="w-4/12 bg-slate-100 drop-shadow-lg relative">
      <div className="mx-5 my-2">
        <div>
          <span>Carts</span>
        </div>
        {amount > 0 && (
          <div>
            <div className="flex my-3 items-center">
              <div className="w-full">
                <h3 className="text-2xl font-semibold">{product?.name}</h3>
                <p className="text-sm">type: {product?.type}</p>
              </div>
              <div className="w- space-y-2">
                <div className="flex space-x-2">
                  <div>
                    <ButtonIcon onClick={addAmountCart}>
                      <PlusIcon className="w-5 h-5" />
                    </ButtonIcon>
                  </div>
                  <div>
                    <ButtonIcon onClick={removeAmountCart}>
                      <MinusIcon className="w-5 h-5" />
                    </ButtonIcon>
                  </div>
                </div>
                {/* <div className="flex space-x-2">
                  <div>
                    <input
                      type="number"
                      className="py-1 px-0.5 w-12  border rounded-md border-amber-500"
                    />
                  </div>
                  <div>
                    <Button>Add</Button>
                  </div>
                </div> */}
              </div>
            </div>
            <hr className="border-b-2 border-orange-200 rounded-sm mt-2" />
            <div className="flex justify-between">
              <span className="text-red-700">{transformCurrency(initPricePerItem)}</span>
              <span>X {amount}</span>
            </div>
          </div>
        )}
        {amount === 0 && (
          <div>
            <p>Cart is empty</p>
          </div>
        )}
        <div className="flex absolute bottom-2 inset-x-0">
          <div className="flex mx-3 w-full items-center">
            <div className=" w-full">
              <span className="text-xl font-bold">Total : </span>
              <span className="text-xl font-medium">{transformCurrency(totalPrice)}</span>
            </div>
            <div className="w-full">
              <Button full onClick={onShowModal}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Aside;

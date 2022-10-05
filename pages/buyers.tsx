import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import classNames from 'classnames';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import LayoutDefault from '@/components/layouts/Default';
import { getDataBuyers } from '@/store/buyerSlice';
import BuyerModalCreate from '@/components/buyers/BuyerModalCreate';
import BuyerModalEdit from '@/components/buyers/BuyerModalEdit';
import BuyerModalDelete from '@/components/buyers/BuyerModalDelete';
import Button from '@/components/UI/Form/Button';
import ButtonIcon from '@/components/UI/Form/ButtonIcon';

const Buyers: NextPage = () => {
  const dispatch = useAppDispatch();

  const buyers = useAppSelector((state) => state.buyers);
  const { data } = buyers;

  const [id, setId] = useState<number>(0);
  const [showModalAddBuyer, setShowModalAddBuyer] = useState<boolean>(false);
  const [showModalEditBuyer, setShowModalEditBuyer] = useState<boolean>(false);
  const [showModalDeleteBuyer, setShowModalDeleteBuyer] = useState<boolean>(false);

  const handleShowModalAddBuyer = () => {
    setShowModalAddBuyer(true);
  };

  const handleHideModalAddBuyer = () => {
    setShowModalAddBuyer(false);
  };

  const handleShowModalEditBuyer = (id: number | string) => {
    setId(parseInt(id.toString()));
    setShowModalEditBuyer(true);
  };

  const handleHideModalEditBuyer = () => {
    setShowModalEditBuyer(false);
  };

  const handleShowModalDeleteBuyer = (id: number | string) => {
    setId(parseInt(id.toString()));
    setShowModalDeleteBuyer(true);
  };

  const handleHideModalDeleteBuyer = () => {
    setShowModalDeleteBuyer(false);
  };

  useEffect(() => {
    dispatch(getDataBuyers());
  }, []);

  const TheadClass = classNames(
    'px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left',
  );

  const TrowClass = classNames('border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4');

  return (
    <>
      {showModalAddBuyer && <BuyerModalCreate onClose={handleHideModalAddBuyer} />}
      {showModalEditBuyer && <BuyerModalEdit id={id} onClose={handleHideModalEditBuyer} />}
      {showModalDeleteBuyer && <BuyerModalDelete id={id} onClose={handleHideModalDeleteBuyer} />}
      <LayoutDefault>
        <div className="mx-auto max-w-screen-lg">
          <div className="mb-2 flex justify-between">
            <h1>Buyers</h1>
            <Button onClick={handleShowModalAddBuyer}>
              <span>Add Buyer</span>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded ">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className={TheadClass}>ID</th>
                  <th className={TheadClass}>Name</th>
                  <th className={TheadClass}>Type</th>
                  <th className={TheadClass}>Action</th>
                </tr>
              </thead>
              {data?.map((buyer) => (
                <tr key={buyer.id}>
                  <td className={TrowClass}>{buyer.id}</td>
                  <td className={TrowClass}>{buyer.name}</td>
                  <td className={TrowClass}>{buyer.type}</td>
                  <td>
                    <div className="flex space-x-2">
                      <ButtonIcon onClick={() => handleShowModalEditBuyer(buyer.id)}>
                        <PencilIcon className="h-4 w-4" />
                      </ButtonIcon>
                      <ButtonIcon onClick={() => handleShowModalDeleteBuyer(buyer.id)}>
                        <TrashIcon className="h-4 w-4" />
                      </ButtonIcon>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </LayoutDefault>
      ;
    </>
  );
};

export default Buyers;

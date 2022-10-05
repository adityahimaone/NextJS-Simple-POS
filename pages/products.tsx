import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import classNames from 'classnames';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import LayoutDefault from '@/components/layouts/Default';
import ButtonIcon from '@/components/UI/Form/ButtonIcon';
import ProductModalCreate from '@/components/products/ProductModalCreate';
import Button from '@/components/UI/Form/Button';
import { getDataProducts } from '@/store/productsSlice';

const Products: NextPage = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products);
  const { data } = products;

  const [showModalAddProduct, setShowModalAddProduct] = useState<boolean>(false);
  const [showModalEditProduct, setShowModalEditProduct] = useState<boolean>(false);
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState<boolean>(false);

  const handleShowModalAddProduct = () => {
    setShowModalAddProduct(true);
  };

  const handleHideModalAddProduct = () => {
    setShowModalAddProduct(false);
  };

  useEffect(() => {
    dispatch(getDataProducts());
  }, []);

  const TheadClass = classNames(
    'px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left',
  );

  const TrowClass = classNames('border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4');
  return (
    <>
      {showModalAddProduct && <ProductModalCreate onClose={handleHideModalAddProduct} />}
      <LayoutDefault>
        <div className="mx-auto max-w-screen-lg">
          <div className="mb-2 flex justify-between">
            <h1>Products</h1>
            <Button onClick={handleShowModalAddProduct}>
              <span>Add Product </span>
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
                  <th className={TheadClass}>Prices</th>
                  <th className={TheadClass}>Action</th>
                </tr>
              </thead>
              {data?.map((product) => (
                <tr key={product.id}>
                  <td className={TrowClass}>{product.id}</td>
                  <td className={TrowClass}>{product.name}</td>
                  <td className={TrowClass}>{product.type}</td>
                  <td className={TrowClass}>
                    {product.prices.map((price) => (
                      <span key={price.price} className="bg-slate-50 p-2 rounded-md mr-2">
                        {price.priceFor} - {price.price}
                      </span>
                    ))}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <ButtonIcon>
                        <PencilIcon className="h-4 w-4" />
                      </ButtonIcon>
                      <ButtonIcon>
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
    </>
  );
};

export default Products;

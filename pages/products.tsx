import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import classNames from 'classnames';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import LayoutDefault from '@/components/layouts/Default';
import ButtonIcon from '@/components/UI/Form/ButtonIcon';
import ProductModalCreate from '@/components/products/ProductModalCreate';
import ProductModalEdit from '@/components/products/ProductModalEdit';
import ProductModalDelete from '@/components/products/ProductModalDelete';
import Button from '@/components/UI/Form/Button';
import { getDataProducts } from '@/store/productsSlice';
import transformCurrency from '@/utils/helper/transformCurrency';

const Products: NextPage = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products);
  const { data } = products;

  const [id, setId] = useState<number>(0);
  const [showModalAddProduct, setShowModalAddProduct] = useState<boolean>(false);
  const [showModalEditProduct, setShowModalEditProduct] = useState<boolean>(false);
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState<boolean>(false);

  const handleShowModalAddProduct = () => {
    setShowModalAddProduct(true);
  };

  const handleHideModalAddProduct = () => {
    setShowModalAddProduct(false);
  };

  const handleShowModalEditProduct = (id: number | string) => {
    setId(parseInt(id.toString()));
    setShowModalEditProduct(true);
  };

  const handleHideModalEditProduct = () => {
    setShowModalEditProduct(false);
  };

  const handleShowModalDeleteProduct = (id: number | string) => {
    setId(parseInt(id.toString()));
    setShowModalDeleteProduct(true);
  };

  const handleHideModalDeleteProduct = () => {
    setShowModalDeleteProduct(false);
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
      {showModalEditProduct && <ProductModalEdit id={id} onClose={handleHideModalEditProduct} />}
      {showModalDeleteProduct && <ProductModalDelete id={id} onClose={handleHideModalDeleteProduct} />}
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
                        {price.priceFor} - {transformCurrency(price.price)}
                      </span>
                    ))}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <ButtonIcon onClick={() => handleShowModalEditProduct(product.id)}>
                        <PencilIcon className="h-4 w-4" />
                      </ButtonIcon>
                      <ButtonIcon onClick={() => handleShowModalDeleteProduct(product.id)}>
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

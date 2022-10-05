import React from 'react';
import { useFormik } from 'formik';

import Modal from '../UI/Modal';
import InputText from '../UI/Form/InputText';
import Button from '../UI/Form/Button';
import InputSelect from '../UI/Form/InputSelect';
import { OptionsBuyer, OptionsProductType } from '@/utils/Constants';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addDataProducts } from '@/store/productsSlice';

interface IProductModalAdd {
  onClose: () => void;
}

function ProductModalCreate({ onClose }: IProductModalAdd): JSX.Element {
  const dispatch = useAppDispatch();

  const formikFormCreateProduct = useFormik({
    initialValues: {
      name: '',
      type: 'hats',
      price: [
        {
          priceFor: 'regular',
          price: '',
        },
      ],
    },
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 1000000);
      const newValues = {
        ...values,
        id,
        prices: values.price.map((price) => ({
          ...price,
          price: parseInt(price.price),
        })),
      };
      dispatch(addDataProducts(newValues));
      onClose();
    },
  });

  return (
    <Modal onClose={onClose} title="Add Product">
      <form onSubmit={formikFormCreateProduct.handleSubmit}>
        <InputText
          label="Name"
          name="name"
          placeholder="Product name"
          value={formikFormCreateProduct.values.name}
          onChange={formikFormCreateProduct.handleChange}
        />
        <InputSelect
          label="Type"
          name="type"
          value={formikFormCreateProduct.values.type}
          onChange={formikFormCreateProduct.handleChange}
          options={OptionsProductType}
        />
        {/* input text price array */}
        <div className="bg-slate-100 p-2 rounded-md mb-2">
          {formikFormCreateProduct.values.price.map((price, index) => (
            <div key={index} className="flex space-x-2">
              <div className="flex-1">
                <InputSelect
                  label="Price For"
                  name={`price[${index}].priceFor`}
                  value={price.priceFor}
                  onChange={formikFormCreateProduct.handleChange}
                  options={OptionsBuyer}
                />
              </div>
              <div className="flex-1">
                <InputText
                  label="Price"
                  name={`price[${index}].price`}
                  placeholder="Price"
                  value={price.price}
                  onChange={formikFormCreateProduct.handleChange}
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-md px-2 py-1"
                  onClick={() => {
                    const priceArray = formikFormCreateProduct.values.price;
                    priceArray.splice(index, 1);
                    formikFormCreateProduct.setFieldValue('price', priceArray);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() =>
                formikFormCreateProduct.setFieldValue('price', [
                  ...formikFormCreateProduct.values.price,
                  { priceFor: '', price: '' },
                ])
              }
            >
              Add Price
            </Button>
          </div>
        </div>
        <Button type="submit" full>
          Submit
        </Button>
      </form>
    </Modal>
  );
}

export default ProductModalCreate;

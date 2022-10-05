import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import Modal from '../UI/Modal';
import InputText from '../UI/Form/InputText';
import Button from '../UI/Form/Button';
import InputSelect from '../UI/Form/InputSelect';
import { OptionsBuyer, OptionsProductType } from '@/utils/Constants';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getDataProductsByID, editDataProduct } from '@/store/productsSlice';
import { IProduct } from '@/utils/Types';

interface IProductModalEdit {
  onClose: () => void;
  id: number;
}

function ProductModalEdit({ onClose, id }: IProductModalEdit): JSX.Element {
  const dispatch = useAppDispatch();

  const formikFormEditProduct = useFormik({
    initialValues: {
      name: '',
      type: 'hats',
      prices: [
        {
          priceFor: 'regular',
          price: '',
        },
      ],
    },
    onSubmit: (values) => {
      const newValues = {
        ...values,
        id,
        prices: values.prices.map((price) => ({
          ...price,
          price: parseInt(price.price),
        })),
      };
      dispatch(editDataProduct(newValues));
      onClose();
    },
  });

  useEffect(() => {
    const newId = id.toString();
    const getData = dispatch(getDataProductsByID(newId));
    getData.then((res) => {
      const data: unknown = res.payload;
      const newData: IProduct = data as IProduct;
      formikFormEditProduct.setValues({
        name: newData.name,
        type: newData.type,
        prices: newData.prices.map((price) => ({
          priceFor: price.priceFor,
          price: price.price.toString(),
        })),
      });
    });
  }, [id]);

  return (
    <Modal onClose={onClose} title="Edit Product">
      <form onSubmit={formikFormEditProduct.handleSubmit}>
        <InputText
          label="Name"
          name="name"
          placeholder="Product name"
          value={formikFormEditProduct.values.name}
          onChange={formikFormEditProduct.handleChange}
        />
        <InputSelect
          label="Type"
          name="type"
          value={formikFormEditProduct.values.type}
          onChange={formikFormEditProduct.handleChange}
          options={OptionsProductType}
        />
        {/* input text price array */}
        <div className="bg-slate-100 p-2 rounded-md mb-2">
          {formikFormEditProduct.values.prices.map((price, index) => (
            <div key={index} className="flex space-x-2">
              <div className="flex-1">
                <InputSelect
                  label="Price For"
                  name={`prices[${index}].priceFor`}
                  value={price.priceFor}
                  onChange={formikFormEditProduct.handleChange}
                  options={OptionsBuyer}
                />
              </div>
              <div className="flex-1">
                <InputText
                  label="Price"
                  name={`prices[${index}].price`}
                  placeholder="Price"
                  value={price.price}
                  onChange={formikFormEditProduct.handleChange}
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-md px-2 py-1"
                  onClick={() => {
                    const priceArray = formikFormEditProduct.values.prices;
                    priceArray.splice(index, 1);
                    formikFormEditProduct.setFieldValue('prices', priceArray);
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
                formikFormEditProduct.setFieldValue('prices', [
                  ...formikFormEditProduct.values.prices,
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

export default ProductModalEdit;

import React from 'react';
import { useFormik } from 'formik';

import Modal from '../UI/Modal';
import InputText from '../UI/Form/InputText';
import Button from '../UI/Form/Button';
import InputSelect from '../UI/Form/InputSelect';
import { OptionsBuyer } from '@/utils/Constants';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addDataBuyer } from '@/store/buyerSlice';

interface IBuyerModalCreate {
  onClose: () => void;
}

function BuyerModalCreate({ onClose }: IBuyerModalCreate): JSX.Element {
  const dispatch = useAppDispatch();

  const formikFormCreateBuyer = useFormik({
    initialValues: {
      name: '',
      type: 'regular',
    },
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 1000000);
      const newValues = {
        ...values,
        id,
      };
      dispatch(addDataBuyer(newValues));
      onClose();
    },
  });
  return (
    <Modal onClose={onClose} title="Add Buyer">
      <form onSubmit={formikFormCreateBuyer.handleSubmit}>
        <InputText
          label="Name"
          name="name"
          placeholder="Buyer Name"
          value={formikFormCreateBuyer.values.name}
          onChange={formikFormCreateBuyer.handleChange}
        />
        <InputSelect
          label="Type"
          name="type"
          value={formikFormCreateBuyer.values.type}
          onChange={formikFormCreateBuyer.handleChange}
          options={OptionsBuyer}
        />
        <Button type="submit" full>
          Submit
        </Button>
      </form>
    </Modal>
  );
}

export default BuyerModalCreate;

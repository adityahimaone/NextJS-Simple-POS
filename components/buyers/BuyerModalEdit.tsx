import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import Modal from '../UI/Modal';
import InputText from '../UI/Form/InputText';
import Button from '../UI/Form/Button';
import InputSelect from '../UI/Form/InputSelect';
import { OptionsBuyer } from '@/utils/Constants';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { editDataBuyer, getDataBuyerById } from '@/store/buyerSlice';
import { IBuyer } from '@/utils/Types';

interface IBuyerModalEdit {
  onClose: () => void;
  id: number;
}

function BuyerModalEdit({ onClose, id }: IBuyerModalEdit): JSX.Element {
  const dispatch = useAppDispatch();

  const formikFormEditBuyer = useFormik({
    initialValues: {
      name: '',
      type: 'regular',
    },
    onSubmit: (values) => {
      const newValues = {
        ...values,
        id,
      };
      dispatch(editDataBuyer(newValues));
      onClose();
    },
  });

  console.log(id, 'id');

  useEffect(() => {
    const newId = id.toString();
    const getData = dispatch(getDataBuyerById(newId));
    getData.then((res) => {
      const data: unknown = res.payload;
      const newData: IBuyer = data as IBuyer;
      formikFormEditBuyer.setValues({
        name: newData.name,
        type: newData.type,
      });
    });
  }, [id]);

  return (
    <Modal onClose={onClose} title="Edit Buyer">
      <form onSubmit={formikFormEditBuyer.handleSubmit}>
        <InputText
          label="Name"
          name="name"
          placeholder="Buyer Name"
          value={formikFormEditBuyer.values.name}
          onChange={formikFormEditBuyer.handleChange}
        />
        <InputSelect
          label="Type"
          name="type"
          value={formikFormEditBuyer.values.type}
          onChange={formikFormEditBuyer.handleChange}
          options={OptionsBuyer}
        />
        <Button type="submit" full>
          Submit
        </Button>
      </form>
    </Modal>
  );
}

export default BuyerModalEdit;

import React from 'react';

import Modal from '../UI/Modal';
import Button from '../UI/Form/Button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { deleteDataBuyer, getDataBuyers } from '@/store/buyerSlice';

interface IBuyerModalDelete {
  onClose: () => void;
  id: number;
}

function BuyerModalDelete({ onClose, id }: IBuyerModalDelete): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    const newId = id.toString();
    dispatch(deleteDataBuyer(newId));
    dispatch(getDataBuyers());
    onClose();
  };
  return (
    <Modal onClose={onClose} title="Delete Buyer">
      <div>
        <h1 className="text-center text-lg font-semibold">Are you sure to delete this buyer?</h1>
      </div>
      <div className="flex justify-end space-x-2 mt-5">
        <Button onClick={handleDelete} type="button">
          Confirm
        </Button>
        <button onClick={onClose} className="btn-secondary" type="button">
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default BuyerModalDelete;

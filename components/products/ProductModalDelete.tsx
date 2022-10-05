import React from 'react';

import Modal from '../UI/Modal';
import { useAppDispatch } from '@/store/hooks';
import { deleteDataProduct, getDataProducts } from '@/store/productsSlice';
import Button from '../UI/Form/Button';

interface IProductModalDelete {
  onClose: () => void;
  id: number;
}

function ProductModalDelete({ onClose, id }: IProductModalDelete): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    const newId = id.toString();
    dispatch(deleteDataProduct(newId));
    dispatch(getDataProducts());
    onClose();
  };

  return (
    <Modal onClose={onClose} title="Delete Product">
      <div>
        <h1 className="text-center text-lg font-semibold">Are you sure to delete this product?</h1>
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

export default ProductModalDelete;

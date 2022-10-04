import React from "react";

import Modal from "./UI/Modal";
import InputText from "./UI/Form/InputText";

function Checkout({ onClose }: { onClose: () => void }): JSX.Element {
  return (
    <Modal onClose={onClose}>
      <div>
        <h2>Checkout</h2>
      </div>
      <div>
        <InputText name="name" label="Name" />
      </div>
    </Modal>
  );
}

export default Checkout;

import React, { useState } from "react";

import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import Aside from "@/components/UI/Aside";
import Checkout from "@/components/Checkout/CheckoutModal";

interface ILayoutWithAside {
  children: React.ReactNode;
}

function LayoutWithAside({ children }: ILayoutWithAside): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="max-h-screen bg-slate-100">
      {showModal && <Checkout onClose={closeModalHandler} />}
      <Header />
      <main className="flex h-[80vh] container mx-auto">
        <Aside onShowModal={showModalHandler} />
        <section className="w-8/12 ">
          <div className="mx-5 my-2">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LayoutWithAside;

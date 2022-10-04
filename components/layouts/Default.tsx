import React, { useState } from "react";

import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import Aside from "@/components/UI/Aside";
import Checkout from "@/components/CheckoutModal";

interface ILayoutDefault {
  children: React.ReactNode;
}

function LayoutDefault({ children }: ILayoutDefault): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="max-h-screen">
      {showModal && <Checkout onClose={closeModalHandler} />}
      <Header />
      <main className="flex h-[80vh]">
        <Aside onShowModal={showModalHandler} />
        <section className="w-8/12 bg-slate-100">
          <div className="mx-5 my-2">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LayoutDefault;

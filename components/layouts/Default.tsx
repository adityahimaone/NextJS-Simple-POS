import React from "react";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";

interface ILayoutDefault {
  children: React.ReactNode;
}

function LayoutDefault({ children }: ILayoutDefault): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default LayoutDefault;

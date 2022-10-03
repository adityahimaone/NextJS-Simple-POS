import React from "react";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import Aside from "@/components/UI/Aside";

interface ILayoutDefault {
  children: React.ReactNode;
}

function LayoutDefault({ children }: ILayoutDefault): JSX.Element {
  return (
    <div className="max-h-screen">
      <Header />
      <main className="flex h-[80vh]">
        <Aside />
        <section className="w-8/12 bg-slate-100">
          <div className="mx-5 my-2">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LayoutDefault;

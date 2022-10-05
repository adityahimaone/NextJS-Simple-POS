import React from 'react';
import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';

interface ILayoutDefault {
  children: React.ReactNode;
}

function LayoutDefault({ children }: ILayoutDefault): JSX.Element {
  return (
    <div className="max-h-screen bg-slate-100">
      <Header />
      <main className="flex h-[80vh] container mx-auto">
        <div className="mx-5 mt-2 w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default LayoutDefault;

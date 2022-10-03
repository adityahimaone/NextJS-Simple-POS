import type { NextPage } from "next";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import LayoutDefault from "@/components/layouts/Default";
import CardProduct from "@/components/CardProduct";

const Home: NextPage = () => {
  const products = useAppSelector((state) => state.products);

  console.log(products);
  return (
    <LayoutDefault>
      <div>
        <h1>Products</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
        {products.data.map((product) => (
          <CardProduct key={product.name} {...product} />
        ))}
      </div>
    </LayoutDefault>
  );
};

export default Home;

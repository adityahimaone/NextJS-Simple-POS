import React, { useEffect } from 'react';
import type { NextPage } from 'next';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import LayoutDefault from '@/components/layouts/Default';
import { getDataSummary } from '@/store/summarySlice';
import { getDataProducts } from '@/store/productsSlice';
import transformCurrency from '@/utils/helper/transformCurrency';

const Summary: NextPage = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector((state) => state.summary);
  const transactions = useAppSelector((state) => state.transactions);
  const buyers = useAppSelector((state) => state.buyers);
  const products = useAppSelector((state) => state.products);

  const { data } = transactions;

  let bestSellingItemKey = '';
  let bestSellingCategoryKey = '';
  let revenueOfTheDay = 0;

  const getBestSellingAndCategory = () => {
    const itemsObj: {
      [key: string]: number;
    } = {};
    const categoriesObj: {
      [key: string]: number;
    } = {};
    let maxItems = 0;
    let maxCategories = 0;

    data.forEach((transaction) => {
      // best selling item
      const { item } = transaction;
      if (itemsObj[item] === undefined) {
        itemsObj[item] = 1;
      } else {
        itemsObj[item] += 1;
      }
      //   best selling category
      const productObj = products.data.find((product) => product.name === item);
      if (productObj) {
        const { type } = productObj;
        if (categoriesObj[type] === undefined) {
          categoriesObj[type] = 1;
        } else {
          categoriesObj[type] += 1;
        }
      }
    });

    for (let key in itemsObj) {
      if (itemsObj[key] > maxItems) {
        maxItems = itemsObj[key];
        bestSellingItemKey = key;
      }
    }
    for (let key in categoriesObj) {
      if (categoriesObj[key] > maxCategories) {
        maxCategories = categoriesObj[key];
        bestSellingCategoryKey = key;
      }
    }
    return { bestSellingItemKey, bestSellingCategoryKey };
  };

  const getRevenueOfTheDay = () => {
    let sum = 0;
    data.forEach((transaction) => {
      const { buyer, item, qty } = transaction;
      const buyerObj = buyers.data.find((buyerObj) => buyerObj.name === buyer);
      const productObj = products.data.find((productObj) => productObj.name === item);
      const pricesObj = productObj?.prices.find((pricesObj) => pricesObj.priceFor === buyerObj?.type || 'regular');
      console.log(pricesObj?.price, 'pricesObj');
      sum += (pricesObj?.price !== undefined ? pricesObj?.price : 0) * qty;
    });
    return (revenueOfTheDay = sum);
  };

  getRevenueOfTheDay();
  getBestSellingAndCategory();

  // console.log(bestSellingItemKey, 'bestSellingItemKey');
  // console.log(bestSellingCategoryKey, 'bestSellingCategoryKey');
  // console.log(revenueOfTheDay, 'revenueOfTheDay');

  const { totalTransaction, bestSellingItem, bestSellingCategory, revenue, rpc, bestSpenders } = summary.data;

  useEffect(() => {
    dispatch(getDataSummary());
    dispatch(getDataProducts());
  }, []);

  useEffect(() => {
    if (data.length > 0) {
    }
  }, [data]);

  return (
    <LayoutDefault>
      <div className="mx-auto max-w-screen-lg">
        <div>
          <h1 className="text-xl font-semibold">Summary Report</h1>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-2">
            <div>Total Transaction</div>
            <div> : {data.length}</div>
            <div>Best Selling Item </div>
            <div> : {bestSellingItemKey}</div>
            <div>Best Selling Category</div>
            <div> : {bestSellingCategoryKey}</div>
            <div>Revenue of the Day</div>
            <div> : {transformCurrency(revenueOfTheDay)}</div>
            <div className="flex items-center">Revenue per Category</div>
            <div className="flex space-x-2 items-center">
              <span> : </span>
              {rpc?.map((item) => (
                <div className="flex p-1 bg-slate-300 rounded-md space-x-2" key={item.category}>
                  <div>{item.category}</div>
                  <div>{item.revenue}</div>
                </div>
              ))}
            </div>
            <div>Three Most Spender Customer</div>
            <div className="flex space-x-2 items-center">
              <span> : </span>
              {bestSpenders?.map((item) => (
                <div className="flex p-1 bg-slate-300 rounded-md space-x-2" key={item.name}>
                  <div>{item.name}</div>
                  <div>{item.type}</div>
                  <div>{transformCurrency(item.spent)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
};

export default Summary;

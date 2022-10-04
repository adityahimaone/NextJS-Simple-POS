export interface IProduct {
  id: string | number;
  name: string;
  type: string;
  prices: {
    priceFor: string;
    price: number;
  }[];
}

export interface IInitalState {
  loading: boolean;
  error: string | undefined;
}

export interface IIntialStateProducts extends IInitalState {
  data: IProduct[];
}

export interface IIntialStateCart extends IInitalState {
  data: {
    product: IProduct;
    amount: number;
  };
}

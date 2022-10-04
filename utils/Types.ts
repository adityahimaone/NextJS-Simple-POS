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

export interface IInitialStateBuyer extends IInitalState {
  data: {
    id: string | number;
    name: string;
    type: string;
  }[];
}

export interface IOption {
  value: string | number;
  label: string;
}
export interface IResponse {
  status: string;
  result: any;
  errors: Record<string, unknown>;
}

export interface ICheckoutData {
  buyer: {
    id: string | number;
    name: string;
    type: string;
  };
  product: IProduct;
  amount: number;
  total: number;
}

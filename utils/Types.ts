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

export interface IInitialStateTransaction extends IInitalState {
  data: ITransaction[];
}

export interface IInitialStateSummary extends IInitalState {
  data: {
    totalTransaction: number;
    bestSellingItem: string;
    bestSellingCategory: string;
    rpc: {
      category: string;
      revenue: number;
    }[];
    revenue: number;
    bestSpenders: {
      name: string;
      type: string;
      spent: number;
    }[];
  };
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

export interface IBuyer {
  id: string | number;
  name: string;
  type: string;
}

export interface ICheckoutData {
  buyer: IBuyer;
  product: IProduct;
  amount: number;
  total: number;
}

export interface ITransaction {
  id: string | number;
  item: string;
  qty: number;
  buyer: string;
}

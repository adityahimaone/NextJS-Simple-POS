export interface IProduct {
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

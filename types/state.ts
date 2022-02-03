import { ActionType } from "./alias";
import { IProduct } from "./data";

export interface IAppState {
  products: IProduct[];
  haveWeSetTheProducts: boolean;
}

export interface IPayloadObject<T> {
  payload: T;
}

export interface PayloadAction<T> extends IPayloadObject<T> {
  type: ActionType;
}

export type SetProductsAction = PayloadAction<IProduct[]>;

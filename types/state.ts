import { ActionType } from "./alias";
import { IProduct } from "./data";

export interface IState {
  products: IProduct[];
}

export interface IPayloadObject<T> {
  payload: T;
}

export interface PayloadAction<T> extends IPayloadObject<T> {
  type: ActionType;
}

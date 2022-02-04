import { createReducer } from "@reduxjs/toolkit";
import { IAppState, SetProductsAction } from "types/state";
import { IProductItemInListing } from "types/data";
import actionNames from "./actions/names";

const { SET_PRODUCTS } = actionNames;

const initialState: IAppState = {
  products: [],
  haveWeSetTheProducts: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(SET_PRODUCTS, (state, action: SetProductsAction) => {
    state.products = action.payload.map((productItem) => ({
      ...productItem,
      isChecked: false,
    })) as IProductItemInListing[];
    state.haveWeSetTheProducts = true;
  });
});

export default reducer;

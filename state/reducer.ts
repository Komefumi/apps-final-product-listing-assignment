import { createReducer } from "@reduxjs/toolkit";
import {
  IAppState,
  SetProductsAction,
  SetFiltersModesPublicationListingModeAction,
  SetFiltersListsPurchaseAvailabilityAction,
  SetFiltersListsProductTypeAction,
} from "types/state";
import { IProductItemInListing } from "types/data";
import actionNames from "./actions/names";

const {
  SET_PRODUCTS,
  SET_FILTER__MODES__PUBLICATION_LISTING_MODE,
  SET_FILTER__LISTS__PURCHASE_AVAILABILITY,
  SET_FILTER__LISTS__PRODUCT_TYPE,
} = actionNames;

const initialState: IAppState = {
  products: [],
  haveWeSetTheProducts: false,
  filters: {
    modes: {
      publicationListingMode: "All",
    },
    lists: {
      purchaseAvailability: null,
      productType: null,
    },
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_PRODUCTS, (state, action: SetProductsAction) => {
      state.products = action.payload.map((productItem) => ({
        ...productItem,
        isChecked: false,
      })) as IProductItemInListing[];
      state.haveWeSetTheProducts = true;
    })
    .addCase(
      SET_FILTER__MODES__PUBLICATION_LISTING_MODE,
      (state, action: SetFiltersModesPublicationListingModeAction) => {
        state.filters.modes.publicationListingMode = action.payload;
      }
    )
    .addCase(
      SET_FILTER__LISTS__PURCHASE_AVAILABILITY,
      (state, action: SetFiltersListsPurchaseAvailabilityAction) => {
        state.filters.lists.purchaseAvailability = action.payload;
      }
    )
    .addCase(
      SET_FILTER__LISTS__PRODUCT_TYPE,
      (state, action: SetFiltersListsProductTypeAction) => {
        state.filters.lists.productType = action.payload;
      }
    );
});

export default reducer;

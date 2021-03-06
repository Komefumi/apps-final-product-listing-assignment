import { createReducer } from "@reduxjs/toolkit";
import { getListFilterOrNullIfEmpty } from "utils/state";
import {
  IAppState,
  SetProductsAction,
  SetFiltersModesPublicationListingModeAction,
  SetFiltersListsPurchaseAvailabilityAction,
  SetFiltersListsProductTypeAction,
  SetFiltersListsVendorNameAction,
  SetFiltersQueryAction,
} from "types/state";
import {
  IProduct,
  PurchaseAvailabilityFilters,
  ProductTypeFilters,
  VendorNameFilters,
} from "types/data";
import actionNames from "./actions/names";

const {
  SET_PRODUCTS,
  SET_FILTER__MODES__PUBLICATION_LISTING_MODE,
  SET_FILTER__LISTS__PURCHASE_AVAILABILITY,
  SET_FILTER__LISTS__PRODUCT_TYPE,
  SET_FILTER__LISTS__VENDOR_NAME,
  SET_FILTER__QUERY,
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
      vendorName: null,
    },
    query: "",
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_PRODUCTS, (state, action: SetProductsAction) => {
      state.products = action.payload.map((productItem) => ({
        ...productItem,
        isChecked: false,
      })) as IProduct[];
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
        state.filters.lists.purchaseAvailability = getListFilterOrNullIfEmpty(
          action.payload
        ) as PurchaseAvailabilityFilters;
      }
    )
    .addCase(
      SET_FILTER__LISTS__PRODUCT_TYPE,
      (state, action: SetFiltersListsProductTypeAction) => {
        state.filters.lists.productType = getListFilterOrNullIfEmpty(
          action.payload
        ) as ProductTypeFilters;
      }
    )
    .addCase(
      SET_FILTER__LISTS__VENDOR_NAME,
      (state, action: SetFiltersListsVendorNameAction) => {
        state.filters.lists.vendorName = getListFilterOrNullIfEmpty(
          action.payload
        ) as VendorNameFilters;
      }
    )
    .addCase(SET_FILTER__QUERY, (state, action: SetFiltersQueryAction) => {
      state.filters.query = action.payload;
    });
});

export default reducer;

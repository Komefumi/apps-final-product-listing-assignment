import { createAction } from "@reduxjs/toolkit";
import actionNames from "state/actions/names";
import { createPayloadCarrier } from "utils/state";
import {
  IProduct,
  PublicationListingMode,
  PurchaseAvailabilityFilters,
  ProductTypeFilters,
  QueryFilter,
  VendorNameFilters,
} from "types/data";

const {
  SET_PRODUCTS,
  SET_FILTER__MODES__PUBLICATION_LISTING_MODE,
  SET_FILTER__LISTS__PURCHASE_AVAILABILITY,
  SET_FILTER__LISTS__PRODUCT_TYPE,
  SET_FILTER__LISTS__VENDOR_NAME,
  SET_FILTER__QUERY,
} = actionNames;

export const createSetProducts = createAction(
  SET_PRODUCTS,
  createPayloadCarrier<IProduct[]>()
);

export const createSetFiltersModesPublicationListingMode = createAction(
  SET_FILTER__MODES__PUBLICATION_LISTING_MODE,
  createPayloadCarrier<PublicationListingMode>()
);

export const createSetFiltersListsPurchaseAvailability = createAction(
  SET_FILTER__LISTS__PURCHASE_AVAILABILITY,
  createPayloadCarrier<PurchaseAvailabilityFilters>()
);

export const createSetFiltersListsProductType = createAction(
  SET_FILTER__LISTS__PRODUCT_TYPE,
  createPayloadCarrier<ProductTypeFilters>()
);

export const createSetFiltersListsVendorNames = createAction(
  SET_FILTER__LISTS__VENDOR_NAME,
  createPayloadCarrier<VendorNameFilters>(),
);

export const createSetFiltersQuery = createAction(
  SET_FILTER__QUERY,
  createPayloadCarrier<QueryFilter>(),
)

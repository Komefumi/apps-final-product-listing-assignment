import { ActionType } from "./alias";
import {
  IProduct,
  PublicationListingMode,
  PurchaseAvailabilityFilters,
  ProductTypeFilters,
  QueryFilter,
  VendorNameFilters,
} from "./data";

export interface IAppStateFiltersLists {
  purchaseAvailability: PurchaseAvailabilityFilters;
  productType: ProductTypeFilters;
  vendorName: VendorNameFilters;
}

export interface IAppState {
  products: IProduct[];
  haveWeSetTheProducts: boolean;
  filters: {
    modes: {
      publicationListingMode: PublicationListingMode;
    };
    lists: IAppStateFiltersLists;
    query: QueryFilter;
  };
}

export interface IPayloadObject<T> {
  payload: T;
}

export interface PayloadAction<T> extends IPayloadObject<T> {
  type: ActionType;
}

export type SetProductsAction = PayloadAction<IProduct[]>;
export type SetFiltersModesPublicationListingModeAction =
  PayloadAction<PublicationListingMode>;
export type SetFiltersListsPurchaseAvailabilityAction =
  PayloadAction<PurchaseAvailabilityFilters>;
export type SetFiltersListsProductTypeAction =
  PayloadAction<ProductTypeFilters>;
export type SetFiltersListsVendorNameAction = PayloadAction<VendorNameFilters>;
export type SetFiltersQueryAction = PayloadAction<QueryFilter>;

import { ActionType } from "./alias";
import {
  IProduct,
  IProductItemInListing,
  PublicationListingMode,
  PurchaseAvailabilityFilters,
  ProductTypeFilters,
} from "./data";

export interface IAppStateFiltersLists {
  purchaseAvailability: PurchaseAvailabilityFilters;
  productType: ProductTypeFilters;
}

export interface IAppState {
  products: IProductItemInListing[];
  haveWeSetTheProducts: boolean;
  filters: {
    modes: {
      publicationListingMode: PublicationListingMode;
    };
    lists: IAppStateFiltersLists;
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

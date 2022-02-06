import { IDType, MightOrMightNotExist, MightBeNull } from "./alias";

export enum PublicationStatus {
  ACTIVE = "Active",
  DRAFT = "Draft",
  ARCHIVED = "Archived",
}

export type PublicationListingMode = PublicationStatus | "All";

export enum IndoorOutdoor {
  INDOOR = "Indoor",
  OUTDOOR = "Outdoor",
}

export enum PurchaseAvailability {
  ONLINE_STORE = "Online Store",
  POINT_OF_SALE = "Point of Sale",
  BUY_BUTTON = "Buy Button",
}

export enum ProductType {
  T_SHIRT = "T-Shirt",
  ACCESSORY = "Accessory",
  GIFT_CARD = "Gift Card",
}

export enum VendorName {
  COMPANY_123 = "Company 123",
  BORING_ROCK = "Boring Rock",
  RUSTIC_LTD = "Rustic LTD",
  PARTNERS_DEMO = "partners-demo",
}

export const ProductTypeValues = Object.values(ProductType);

export enum ListFilterName {
  PURCHASE_AVAILABILITY = "purchaseAvailability",
  PRODUCT_TYPE = "productType",
  VENDOR_NAME = "vendorName",
}

export type PurchaseAvailabilityFilters = MightBeNull<PurchaseAvailability[]>;
export type ProductTypeFilters = MightBeNull<ProductType[]>;
export type VendorNameFilters = MightBeNull<VendorName[]>;
export type ListFilter =
  | PurchaseAvailabilityFilters
  | ProductTypeFilters
  | VendorNameFilters;
export type QueryFilter = string;

interface IRating {
  rate: number;
  count: number;
}

export interface IProductFromAPI {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}

export interface IProduct extends Omit<IProductFromAPI, "id"> {
  id: string;
  inventoryCount?: number;
  publicationStatus: PublicationStatus;
  indoorOutdoorType?: IndoorOutdoor;
  vendorName: string;
}

export interface IProductItemInListing extends IProduct {
  isChecked: boolean;
}

export interface ITabData {
  id: IDType;
  content: string;
}

export interface IPublicationModeTabData extends Omit<ITabData, "id"> {
  id: PublicationListingMode;
}

export interface ILabelValue {
  label: string;
  value: string;
}

export interface IAutocompleteDataUnit extends ILabelValue {}
export interface ISearchableDataUnit extends ILabelValue {}
export interface IFilterChoice extends ILabelValue {}

export interface IIndexResource {
  [key: string]: unknown;
}

export interface IListFilterFilterDataItem {
  key: ListFilterName;
  label: string;
  filter: JSX.Element;
  shortcut?: boolean;
}

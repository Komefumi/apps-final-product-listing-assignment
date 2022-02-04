import { IDType, MightOrMightNotExist } from "./alias";
import { extractFromEnum } from "./utils";

export enum PublicationStatus {
  ACTIVE = "Active",
  DRAFT = "Draft",
  ARCHIVED = "Archived",
}

export type PublicationListingMode = PublicationStatus | "All";

enum IndoorOutdoor {
  INDOOR = "Indoor",
  OUTDOOR = "Outdoor",
}

export const PublicationStatusKeysAndValues = extractFromEnum<
  string,
  PublicationStatus
>(PublicationStatus);
export const IndoorOutdoorKeysAndValues = extractFromEnum<
  string,
  IndoorOutdoor
>(IndoorOutdoor);

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

export interface IProduct extends IProductFromAPI {
  publicationStatus: PublicationStatus;
  indoorOrOutdoor?: IndoorOutdoor;
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

export interface IAutocompleteDataUnit {
  label: string;
  value: string;
}

export interface ISearchableDataUnit extends IAutocompleteDataUnit {}

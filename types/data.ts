import { extractFromEnum } from "./utils";

enum PublicationStatus {
  ACTIVE = "Active",
  DRAFT = "Draft",
  ARCHIVED = "Archived",
}

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

export interface IProductItemInListing {
  isChecked: boolean;
}

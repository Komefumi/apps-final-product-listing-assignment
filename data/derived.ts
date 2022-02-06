import {
  PurchaseAvailability,
  ILabelValue,
  ProductType,
  PublicationStatus,
  IndoorOutdoor,
} from "types/data";
import { extractFromEnum } from "types/utils";

export const purchaseAvailabilityValues = Object.values(PurchaseAvailability);
export const purchaseAvailabilityAsLabelValueList: ILabelValue[] =
  purchaseAvailabilityValues.map((value) => ({
    label: value,
    value,
  }));

export const productTypeValues = Object.values(ProductType);

export const productTypeAsLabelValueList: ILabelValue[] = productTypeValues.map(
  (value) => ({
    label: value,
    value,
  })
);

export const publicationStatusKeysAndValues = extractFromEnum<
  string,
  PublicationStatus
>(PublicationStatus);
export const indoorOutdoorKeysAndValues = extractFromEnum<
  string,
  IndoorOutdoor
>(IndoorOutdoor);
export const purchaseAvailabilityKeysAndValues = extractFromEnum<
  string,
  PurchaseAvailability
>(PurchaseAvailability);
export const productTypeKeysAndValues = extractFromEnum<string, ProductType>(
  ProductType
);

import { ListFilterName } from "types/data";

export function disambiguateLabelForListFilter<T extends string>(
  name: ListFilterName,
  value: T[]
) {
  switch (name) {
    case ListFilterName.PURCHASE_AVAILABILITY: {
      return value.map((val) => `Available on ${val}`).join(", ");
    }
    case ListFilterName.PRODUCT_TYPE: {
      return value.join(", ");
    }
    case ListFilterName.VENDOR_NAME: {
      const joinedValue = value.join(", ");
      return `Available from: ${joinedValue}`;
    }
    default:
      return value;
  }
}

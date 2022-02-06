import {
  selectRandomElementFromArray,
  maybeSelectRandomElementFromArray,
  maybeGenerateInventoryCount,
  createArrayOfRandomCountFromSourceArray,
} from "utils/rand";
import { IProductFromAPI, IProduct } from "types/data";
import {
  publicationStatusKeysAndValues,
  indoorOutdoorKeysAndValues,
  purchaseAvailabilityValues,
  productTypeValues,
  vendorNameList,
} from "./derived";

export function generateCompleteProducts(
  productItemsFromAPI: IProductFromAPI[]
): IProduct[] {
  return productItemsFromAPI.map((currentItem) => {
    return {
      ...currentItem,
      id: currentItem.id.toString(),
      inventoryCount: maybeGenerateInventoryCount(),
      publicationStatus: selectRandomElementFromArray(
        publicationStatusKeysAndValues.values
      ),
      indoorOutdoorType: maybeSelectRandomElementFromArray(
        indoorOutdoorKeysAndValues.values
      ),
      purchaseAvailability: createArrayOfRandomCountFromSourceArray(
        purchaseAvailabilityValues
      ),
      productType: selectRandomElementFromArray(productTypeValues),
      vendorName: selectRandomElementFromArray(vendorNameList),
    };
  });
}

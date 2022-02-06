import {
  selectRandomElementFromArray,
  maybeSelectRandomElementFromArray,
  maybeGenerateInventoryCount,
} from "utils/rand";
import { vendorNames } from "data/seed";
import { IProductFromAPI, IProduct } from "types/data";
import {
  publicationStatusKeysAndValues,
  indoorOutdoorKeysAndValues,
} from "./derived";

export function generateCompleteProducts(
  productItemsFromAPI: IProductFromAPI[]
): IProduct[] {
  return productItemsFromAPI.map((currentItem) => {
    return {
      ...currentItem,
      id: currentItem.id.toString(),
      isSelected: false,
      inventoryCount: maybeGenerateInventoryCount(),
      publicationStatus: selectRandomElementFromArray(
        publicationStatusKeysAndValues.values
      ),
      indoorOutdoorType: maybeSelectRandomElementFromArray(
        indoorOutdoorKeysAndValues.values
      ),
      vendorName: selectRandomElementFromArray(vendorNames),
    };
  });
}

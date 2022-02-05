import {
  selectRandomElementFromArray,
  maybeSelectRandomElementFromArray,
  maybeGenerateInventoryCount,
} from "utils/rand";
import { vendorNames } from "data/seed";
import {
  IProductFromAPI,
  IProduct,
  PublicationStatusKeysAndValues,
  IndoorOutdoorKeysAndValues,
} from "types/data";

export function generateCompleteProducts(
  productItemsFromAPI: IProductFromAPI[]
): IProduct[] {
  return productItemsFromAPI.map((currentItem) => {
    return {
      id: currentItem.id.toString(),
      isSelected: false,
      ...currentItem,
      inventoryCount: maybeGenerateInventoryCount(),
      publicationStatus: selectRandomElementFromArray(
        PublicationStatusKeysAndValues.values
      ),
      indoorOutdoorType: maybeSelectRandomElementFromArray(
        IndoorOutdoorKeysAndValues.values
      ),
      vendorName: selectRandomElementFromArray(vendorNames),
    };
  });
}

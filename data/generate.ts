import {
  selectRandomElementFromArray,
  maybeSelectRandomElementFromArray,
} from "utils/rand";
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
      isSelected: false,
      ...currentItem,
      publicationStatus: selectRandomElementFromArray(
        PublicationStatusKeysAndValues.values
      ),
      indoorOrOutdoor: maybeSelectRandomElementFromArray(
        IndoorOutdoorKeysAndValues.values
      ),
    };
  });
}

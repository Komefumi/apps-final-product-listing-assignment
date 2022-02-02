import {
  selectRandomElementFromArray,
  maybeSelectRandomElementFromArray,
} from "utils/rand";
import {
  IProductFromAPI,
  IProduct,
  StatusValues,
  IndoorOutdoorValues,
} from "types/data";

export function generateCompleteProducts(
  productItemsFromAPI: IProductFromAPI[]
): IProduct[] {
  return productItemsFromAPI.map((currentItem) => {
    return {
      ...currentItem,
      status: selectRandomElementFromArray(StatusValues),
      indoorOrOutdoor: maybeSelectRandomElementFromArray(IndoorOutdoorValues),
    };
  });
}

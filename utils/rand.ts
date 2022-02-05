import { ABS_MAX_PRICE, ABS_MAX_INVENTORY } from "config";
import { MightOrMightNotExist } from "types/alias";

export function selectRandomElementFromArray<T>(itemArray: T[]): T {
  const arrayLength = itemArray.length;
  if (arrayLength < 2) {
    throw new Error(
      "Error! It's meaningless to choose a random element from an array that doesn't have at least two elements."
    );
  }
  return itemArray[Math.floor(Math.random() * arrayLength)];
}

export function maybeSelectRandomElementFromArray<T>(
  itemArray: T[]
): MightOrMightNotExist<T> {
  const itShouldBeGenerated = Math.random() > 0.5;
  if (itShouldBeGenerated) return selectRandomElementFromArray(itemArray);
  else return undefined;
}

export function generateRandomPrice(): number {
  const priceRawValue = Math.floor(Math.random() * (ABS_MAX_PRICE + 1));
  const isPositive = Math.random() > 0.5;
  if (isPositive) return priceRawValue;
  else return -1 * priceRawValue;
}

export function maybeGenerateInventoryCount(): MightOrMightNotExist<number> {
  const itShouldBeGenerated = Math.random() > 0.5;
  if (!itShouldBeGenerated) return undefined;
  const inventoryRawCount = Math.floor(Math.random() * (ABS_MAX_INVENTORY + 1));
  const isPositive = Math.random() > 0.5;
  if (isPositive) return inventoryRawCount;
  else return -1 * inventoryRawCount;
}

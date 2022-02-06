import { ABS_MAX_PRICE, inventoryMaximum } from "config";
import { MightOrMightNotExist } from "types/alias";

function getRandomTrueOrFalse(): boolean {
  const integerToCheckWith = parseInt(`${Math.random() * 10}`);
  return !!(integerToCheckWith % 2);
}

function throwIfArrayIsTooSmall<T>(itemArray: T[]) {
  const arrayLength = itemArray.length;
  if (arrayLength < 2) {
    throw new Error(
      "Error! It's meaningless to choose a random element from an array that doesn't have at least two elements."
    );
  }
}

export function createArrayOfRandomCountFromSourceArray<T>(
  itemArray: T[]
): T[] {
  throwIfArrayIsTooSmall(itemArray);
  const arrayLength = itemArray.length;
  const randomSize = Math.floor(Math.random() * arrayLength);
  const createdArray: T[] = [];

  for (let i = 0; i < randomSize; i++) {
    createdArray.push(itemArray[Math.floor(Math.random() * arrayLength)]);
  }
  return createdArray;
}

export function selectRandomElementFromArray<T>(itemArray: T[]): T {
  throwIfArrayIsTooSmall(itemArray);
  return itemArray[Math.floor(Math.random() * itemArray.length)];
}

export function maybeSelectRandomElementFromArray<T>(
  itemArray: T[]
): MightOrMightNotExist<T> {
  const itShouldBeGenerated = getRandomTrueOrFalse();
  if (itShouldBeGenerated) return selectRandomElementFromArray(itemArray);
  else return undefined;
}

export function generateRandomPrice(): number {
  const priceRawValue = Math.floor(Math.random() * (ABS_MAX_PRICE + 1));
  const isPositive = getRandomTrueOrFalse();
  if (isPositive) return priceRawValue;
  else return -1 * priceRawValue;
}

export function maybeGenerateInventoryCount(): MightOrMightNotExist<number> {
  const itShouldBeGenerated = getRandomTrueOrFalse();
  if (!itShouldBeGenerated) return undefined;
  const isPositive = getRandomTrueOrFalse();
  const maxValue = isPositive
    ? inventoryMaximum.positive
    : inventoryMaximum.negative;
  const signDecider = isPositive ? 1 : -1;
  return signDecider * Math.floor(Math.random() * (maxValue + 1));
}

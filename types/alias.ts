export type ActionType = string;
export type MightOrMightNotExist<T> = T | undefined;
export type EnumType<TypeOfValueInEnum> = Record<string, TypeOfValueInEnum>;
export type KeyOrValue = "key" | "value";
export type EnumExtraction<TheEnumItself> = {
  keys: string[];
  values: TheEnumItself[];
};

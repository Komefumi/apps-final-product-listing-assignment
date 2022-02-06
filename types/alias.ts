export type IDType = string;
export type ClassName = string;
export type ActionType = string;
export type MightOrMightNotExist<T> = T | undefined;
export type MightBeNull<T> = T | null;
export type EnumType<TypeOfValueInEnum> = Record<string, TypeOfValueInEnum>;
export type KeyOrValue = "key" | "value";
export type EnumExtraction<TheEnumItself> = {
  keys: string[];
  values: TheEnumItself[];
};
export type NonEmptyArray<T> = [T, ...T[]];

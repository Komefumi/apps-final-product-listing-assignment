import { EnumType, EnumExtraction } from "./alias";

export function extractFromEnum<TypeOfEnumValues, TheEnumItself>(
  enumValue: EnumType<TypeOfEnumValues>
): EnumExtraction<TheEnumItself> {
  return {
    keys: Object.keys(enumValue) as string[],
    values: Object.values(enumValue) as unknown as TheEnumItself[],
  };
}

import { ListFilter } from "types/data";
import { IPayloadObject } from "types/state";

export function createPayloadObject(
  innerValue: any
): IPayloadObject<typeof innerValue> {
  return {
    payload: innerValue,
  };
}

export function createPayloadCarrier<T>() {
  return (payloadValue: T) => ({ payload: payloadValue });
}

export function getListFilterOrNullIfEmpty(filter: ListFilter) {
  if (filter instanceof Array && filter.length) {
    return filter;
  }

  return null;
}

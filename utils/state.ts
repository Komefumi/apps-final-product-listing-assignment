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

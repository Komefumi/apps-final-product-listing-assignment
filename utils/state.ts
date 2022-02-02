import { IPayloadObject } from "types/state";

export function createPayloadObject(
  innerValue: any
): IPayloadObject<typeof innerValue> {
  return {
    payload: innerValue,
  };
}

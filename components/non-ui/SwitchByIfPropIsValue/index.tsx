import { SwitchByIfPropIsValueProps } from "types/prop-types";

export default function SwitchByIfPropIsValue({
  propToLookFor,
  valueForEquality,
  children,
}: SwitchByIfPropIsValueProps) {
  return (
    children.find(
      (element) => element.props[propToLookFor] === valueForEquality
    ) || <></>
  );
}

import { Children as ReactChildren } from "react";
import { ModifyChildAvailableTag } from "types/data";
import { ModifyChildProps } from "types/prop-types";

const lookupTable = {
  [ModifyChildAvailableTag.TR]: (props: any) => <tr {...props} />,
  [ModifyChildAvailableTag.BUTTON]: (props: any) => <button {...props} />,
};

export default function ModifyChild({
  children,
  chosenTag,
  props,
}: ModifyChildProps) {
  const inputObject = ReactChildren.only(children);
  const finalProps = { ...inputObject.props, ...props };
  const RenderComponent = lookupTable[chosenTag];
  return <RenderComponent {...finalProps} />;
}

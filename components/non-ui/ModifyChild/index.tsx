import { Children as ReactChildren, cloneElement, ReactElement } from "react";
import { ModifyChildProps } from "types/prop-types";

export default function ModifyChild({ children, props }: ModifyChildProps) {
  const inputObject = ReactChildren.only(children);
  const finalProps = { ...inputObject.props, ...props };
  return <tr {...finalProps} />;
}

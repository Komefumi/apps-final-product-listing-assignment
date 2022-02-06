import { ReactNode, ReactChild, ReactElement } from "react";
import { ClassName } from "./alias";

export interface WrapperProps {
  className?: ClassName;
  children: ReactNode;
}

export interface ModifyChildProps {
  children: ReactElement;
  props: { [propName: string]: any };
}

export interface ProductsListingControlProps {}

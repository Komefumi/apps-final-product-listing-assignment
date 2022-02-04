import { ReactNode, ReactElement } from "react";
import { ClassName } from "./alias";

export interface WrapperProps {
  className?: ClassName;
  children: ReactNode;
}

export interface SwitchByIfPropIsValueProps {
  children: ReactElement[];
  propToLookFor: string;
  valueForEquality: string | number;
}

export interface SwitchByIndexProps {
  children: ReactElement[];
  currentIndex: number;
}

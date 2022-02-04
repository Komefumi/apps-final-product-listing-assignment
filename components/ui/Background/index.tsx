import clsx from "clsx";
import { WrapperProps } from "types/prop-types";
import classes from "./classes.module.scss";

export default function Background({ className, children }: WrapperProps) {
  return <div className={clsx(classes.background, className)}>{children}</div>;
}

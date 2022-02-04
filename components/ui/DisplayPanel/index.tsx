import clsx from "clsx";
import { WrapperProps } from "types/prop-types";
import classes from "./classes.module.scss";

export default function DisplayPanel({ className, children }: WrapperProps) {
  return (
    <div className={clsx(classes.display_panel, className)}>{children}</div>
  );
}

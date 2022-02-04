import { WrapperProps } from "types/prop-types";
import classes from "./classes.module.scss";

export default function Background({ children }: WrapperProps) {
  return <div className={classes.background}>{children}</div>;
}

import { SwitchByIndexProps } from "types/prop-types";

export default function SwitchByIndex({
  children,
  currentIndex,
}: SwitchByIndexProps) {
  if (currentIndex > children.length) {
    alert("ERROR");
    console.error(
      "ERROR! The currently rendering element (by index) cannot be of index greater than count of available children"
    );
    return null;
  }
  return children[currentIndex];
}

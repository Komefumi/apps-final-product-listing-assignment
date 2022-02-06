import { ReactNode, ReactElement } from "react";
import { ModalProps } from "@shopify/polaris";
import { IProduct, ModifyChildAvailableTag } from "./data";
import { ClassName, TriggerFunc } from "./alias";

export interface WrapperProps {
  className?: ClassName;
  children: ReactNode;
}

export interface ModifyChildProps {
  chosenTag: ModifyChildAvailableTag;
  children: ReactElement;
  props: { [propName: string]: any };
}

export interface ProductsListingControlProps {}

export interface ProductDisplayModalProps
  extends Omit<ModalProps, "open" | "title" | "onClose"> {
  productItem: IProduct;
  isProductModalOpen: boolean;
  handleClose: TriggerFunc;
}

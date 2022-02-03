import { createAction } from "@reduxjs/toolkit";
import actionNames from "state/actions/names";
import { createPayloadCarrier } from "utils/state";
import { IProduct } from "types/data";

const { SET_PRODUCTS } = actionNames;

export const createSetProducts = createAction(
  SET_PRODUCTS,
  createPayloadCarrier<IProduct[]>()
);

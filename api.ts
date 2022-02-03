import { IProductFromAPI } from "types/data";

export const fetchProductsFromAPI = (): Promise<IProductFromAPI[]> =>
  fetch("https://fakestoreapi.com/products").then((res) => res.json());

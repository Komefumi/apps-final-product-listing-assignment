import { useState, useCallback, useMemo, useEffect } from "react";
import { ChoiceList, FilterInterface } from "@shopify/polaris";
import { useAppDispatch, useAppSelector } from "./store";
import {
  createSetFiltersListsPurchaseAvailability,
  createSetFiltersListsProductTypes,
} from "./actions/creators";
import { disambiguateLabelForListFilter } from "utils/data";
import {
  productTypeAsLabelValueList,
  purchaseAvailabilityAsLabelValueList,
} from "data/derived";
import { IAppStateFiltersLists } from "types/state";
import {
  ListFilterName,
  PurchaseAvailability,
  IListFilterFilterDataItem,
  ProductType,
} from "types/data";

function useGetFiltersListsState(): IAppStateFiltersLists {
  const { lists } = useAppSelector((state) => state.filters);
  return lists;
}

export function useGetFiltersListsChangeHandlers() {
  const dispatch = useAppDispatch();
  const handlePurchaseAvailabilityChange = useCallback(
    (value: PurchaseAvailability[]) => {
      dispatch(createSetFiltersListsPurchaseAvailability(value));
    },
    []
  );
  const handleProductTypeChange = useCallback((value: ProductType[]) => {
    dispatch(createSetFiltersListsProductTypes(value));
  }, []);
  return {
    handlePurchaseAvailabilityChange,
    handleProductTypeChange,
  };
}

export function useGetAppliedListsFilters(): FilterInterface[] {
  const [appliedFilters, setAppliedFilters] = useState<FilterInterface[]>([]);
  const { purchaseAvailability, productType } = useGetFiltersListsState();
  const dispatch = useAppDispatch();

  const handlePurchaseAvailabilityRemove = useCallback(() => {
    dispatch(createSetFiltersListsPurchaseAvailability(null));
  }, []);
  const handleProductTypeRemove = useCallback(() => {
    dispatch(createSetFiltersListsProductTypes(null));
  }, []);

  useEffect(() => {
    const localAppliedFilters = [];
    if (purchaseAvailability) {
      const key = ListFilterName.PURCHASE_AVAILABILITY;
      localAppliedFilters.push({
        key,
        label: disambiguateLabelForListFilter(key, purchaseAvailability),
        onRemove: handlePurchaseAvailabilityRemove,
      });
    }
    if (productType) {
      const key = ListFilterName.PRODUCT_TYPE;
      localAppliedFilters.push({
        key,
        label: disambiguateLabelForListFilter(key, productType),
        onRemove: handleProductTypeRemove,
      });
    }
    setAppliedFilters(localAppliedFilters as unknown as FilterInterface[]);
  }, [purchaseAvailability, productType]);

  return appliedFilters;
}

export function useGetListFiltersRendering() {
  const { purchaseAvailability, productType } = useGetFiltersListsState();
  const { handlePurchaseAvailabilityChange, handleProductTypeChange } =
    useGetFiltersListsChangeHandlers();
  const filters: IListFilterFilterDataItem[] = useMemo(
    () => [
      {
        key: ListFilterName.PURCHASE_AVAILABILITY,
        label: "Purchase Availability",
        filter: (
          <ChoiceList
            title="Purchase Availability"
            titleHidden
            choices={purchaseAvailabilityAsLabelValueList}
            selected={purchaseAvailability || []}
            onChange={handlePurchaseAvailabilityChange}
            allowMultiple
          />
        ),
        shortcut: true,
      },
      {
        key: ListFilterName.PRODUCT_TYPE,
        label: "Product Type",
        filter: (
          <ChoiceList
            title="Product Type"
            titleHidden
            choices={productTypeAsLabelValueList}
            selected={productType || []}
            onChange={handleProductTypeChange}
            allowMultiple
          />
        ),
      },
    ],
    [
      purchaseAvailability,
      productType,
      handlePurchaseAvailabilityChange,
      handleProductTypeChange,
    ]
  );
  return filters;
}

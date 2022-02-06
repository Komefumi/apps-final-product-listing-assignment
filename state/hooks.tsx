import { useState, useCallback, useMemo, useEffect } from "react";
import {
  ChoiceList,
  FilterInterface,
  AppliedFilterInterface,
} from "@shopify/polaris";
import { useAppDispatch, useAppSelector } from "./store";
import {
  createSetFiltersListsPurchaseAvailability,
  createSetFiltersListsProductTypes,
  createSetFiltersQuery,
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

export function useGetFiltersQueryStateAndHandlers() {
  const { query } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const handleQueryChange = useCallback((value: string) => {
    dispatch(createSetFiltersQuery(value));
  }, []);
  const handleQueryRemove = useCallback(() => {
    dispatch(createSetFiltersQuery(null));
  }, []);
  return {
    query,
    handleQueryChange,
    handleQueryRemove,
  };
}

export function useGetFiltersListsRemoveHandlers() {
  const dispatch = useAppDispatch();
  const handlePurchaseAvailabilityRemove = useCallback(() => {
    dispatch(createSetFiltersListsPurchaseAvailability(null));
  }, []);
  const handleProductTypeRemove = useCallback(() => {
    dispatch(createSetFiltersListsProductTypes(null));
  }, []);
  const handleFiltersListsClearAll = useCallback(() => {}, [
    handlePurchaseAvailabilityRemove,
    handleProductTypeRemove,
  ]);

  return {
    handlePurchaseAvailabilityRemove,
    handleProductTypeRemove,
    handleFiltersListsClearAll,
  };
}

export function useGetAppliedListsFilters(): AppliedFilterInterface[] {
  const [appliedFilters, setAppliedFilters] = useState<
    AppliedFilterInterface[]
  >([]);
  const { purchaseAvailability, productType } = useGetFiltersListsState();
  const { handlePurchaseAvailabilityRemove, handleProductTypeRemove } =
    useGetFiltersListsRemoveHandlers();

  useEffect(() => {
    const localAppliedFilters: AppliedFilterInterface[] = [];
    if (purchaseAvailability) {
      const key = ListFilterName.PURCHASE_AVAILABILITY;
      localAppliedFilters.push({
        key,
        label: disambiguateLabelForListFilter(
          key,
          purchaseAvailability
        ) as string,
        onRemove: handlePurchaseAvailabilityRemove,
      });
    }
    if (productType) {
      const key = ListFilterName.PRODUCT_TYPE;
      localAppliedFilters.push({
        key,
        label: disambiguateLabelForListFilter(key, productType) as string,
        onRemove: handleProductTypeRemove,
      });
    }
    setAppliedFilters(localAppliedFilters);
  }, [purchaseAvailability, productType]);

  return appliedFilters;
}

export function useGetFiltersFilterDataItems() {
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

export function useGetClearFiltersAllExceptModes() {
  const { handleQueryRemove } = useGetFiltersQueryStateAndHandlers();
  const { handleFiltersListsClearAll } = useGetFiltersListsRemoveHandlers();

  const clearAllExceptModesHandler = useCallback(() => {
    handleQueryRemove();
    handleFiltersListsClearAll();
  }, [handleQueryRemove, handleFiltersListsClearAll]);

  return clearAllExceptModesHandler;
}

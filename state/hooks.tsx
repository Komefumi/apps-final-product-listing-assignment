import { useState, useCallback, useMemo, useEffect } from "react";
import {
  ChoiceList,
  FilterInterface,
  AppliedFilterInterface,
} from "@shopify/polaris";
import { useAppDispatch, useAppSelector } from "./store";
import {
  createSetFiltersListsPurchaseAvailability,
  createSetFiltersListsProductType,
  createSetFiltersListsVendorNames,
  createSetFiltersQuery,
} from "./actions/creators";
import { disambiguateLabelForListFilter } from "utils/data";
import {
  productTypeAsLabelValueList,
  purchaseAvailabilityAsLabelValueList,
  vendorNameAsLabelValueList,
} from "data/derived";
import { IMappingFromStringKeyToMightBeNullStringList } from "types/alias";
import { IAppStateFiltersLists } from "types/state";
import {
  ListFilterName,
  PurchaseAvailability,
  IListFilterFilterDataItem,
  ProductType,
  VendorName,
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
    dispatch(createSetFiltersListsProductType(value));
  }, []);
  const handleVendorNameChange = useCallback((value: VendorName[]) => {
    dispatch(createSetFiltersListsVendorNames(value));
  }, []);
  return {
    handlePurchaseAvailabilityChange,
    handleProductTypeChange,
    handleVendorNameChange,
  };
}

export function useGetFiltersQueryStateAndHandlers() {
  const { query } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const handleQueryChange = useCallback((value: string) => {
    dispatch(createSetFiltersQuery(value));
  }, []);
  const handleQueryRemove = useCallback(() => {
    dispatch(createSetFiltersQuery(""));
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
    dispatch(createSetFiltersListsProductType(null));
  }, []);
  const handleVendorNameRemove = useCallback(() => {
    dispatch(createSetFiltersListsVendorNames(null));
  }, []);
  const removeHandlers = [
    handlePurchaseAvailabilityRemove,
    handleProductTypeRemove,
    handleVendorNameRemove,
  ];
  const handleFiltersListsClearAll = useCallback(() => {
    removeHandlers.forEach((handler) => {
      handler();
    });
  }, removeHandlers);

  return {
    handlePurchaseAvailabilityRemove,
    handleProductTypeRemove,
    handleVendorNameRemove,
    handleFiltersListsClearAll,
  };
}

export function useGetAppliedListsFilters(): AppliedFilterInterface[] {
  const [appliedFilters, setAppliedFilters] = useState<
    AppliedFilterInterface[]
  >([]);
  const { purchaseAvailability, productType, vendorName } =
    useGetFiltersListsState();
  const {
    handlePurchaseAvailabilityRemove,
    handleProductTypeRemove,
    handleVendorNameRemove,
  } = useGetFiltersListsRemoveHandlers();

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
    if (vendorName) {
      const key = ListFilterName.VENDOR_NAME;
      localAppliedFilters.push({
        key,
        label: disambiguateLabelForListFilter(key, vendorName) as string,
        onRemove: handleVendorNameRemove,
      });
    }
    setAppliedFilters(localAppliedFilters);
  }, [
    purchaseAvailability,
    productType,
    vendorName,
    handlePurchaseAvailabilityRemove,
    handleProductTypeRemove,
    handleVendorNameRemove,
  ]);

  return appliedFilters;
}

export function useGetFiltersFilterDataItems() {
  const { purchaseAvailability, productType, vendorName } =
    useGetFiltersListsState();
  const {
    handlePurchaseAvailabilityChange,
    handleProductTypeChange,
    handleVendorNameChange,
  } = useGetFiltersListsChangeHandlers();
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
        shortcut: true,
      },
      {
        key: ListFilterName.VENDOR_NAME,
        label: "Vendor",
        filter: (
          <ChoiceList
            title="Vendor"
            titleHidden
            choices={vendorNameAsLabelValueList}
            selected={vendorName || []}
            onChange={handleVendorNameChange}
            allowMultiple
          />
        ),
      },
    ],
    [
      purchaseAvailability,
      productType,
      vendorName,
      handlePurchaseAvailabilityChange,
      handleProductTypeChange,
      handleVendorNameChange,
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

export function useGetFilteredProducts() {
  const { products, filters } = useAppSelector((state) => state);
  const {
    modes: { publicationListingMode },
    lists: { vendorName, productType, purchaseAvailability },
    query,
  } = filters;
  const propertyToListFilterMapping: IMappingFromStringKeyToMightBeNullStringList =
    {
      purchaseAvailability,
      productType,
      vendorName,
    };

  let filteredProducts = products.slice();
  if (publicationListingMode !== "All") {
    filteredProducts = filteredProducts.filter(
      ({ publicationStatus }) => publicationStatus === publicationListingMode
    );
  }

  if (query.length) {
    const filterRegex = new RegExp(query, "i");
    filteredProducts = filteredProducts.filter((productItx) => {
      return ["title", "description", "category", "vendorName"].some(
        (property) => {
          const propertyValue = productItx[property as string];
          if (typeof propertyValue !== "string") return false;
          return productItx[property].match(filterRegex);
        }
      );
    });
  }

  /*
  if (purchaseAvailability) {
    filteredProducts = filteredProducts.filter((productItx) => {
      return purchaseAvailability.some((piece) => {
        productItx.purchaseAvailability.includes(piece);
      });
    });
  }

  if (purchaseAvailability) {
    filteredProducts = filteredProducts.filter((productItx) => {
      return purchaseAvailability.some((piece) => {
        productItx.purchaseAvailability.includes(piece);
      });
    });
  }
  */

  if (vendorName) {
    filteredProducts = filteredProducts.filter((productItx) =>
      vendorName.includes(productItx.vendorName as VendorName)
    );
  }

  for (let property in propertyToListFilterMapping) {
    const listFilterValue = propertyToListFilterMapping[property];
    if (!listFilterValue) continue;
    filteredProducts = filteredProducts.filter((productItx) => {
      const propertyValue = productItx[property];
      if (propertyValue instanceof Array) {
        return propertyValue.some((piece) => {
          return listFilterValue.includes(piece);
        });
      } else {
        return listFilterValue.includes(propertyValue);
      }
    });
  }

  return filteredProducts;
}

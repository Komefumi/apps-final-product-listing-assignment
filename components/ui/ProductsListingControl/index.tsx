import { Filters } from "@shopify/polaris";
import {
  useGetFiltersQueryStateAndHandlers,
  useGetFiltersFilterDataItems,
  useGetAppliedListsFilters,
  useGetClearFiltersAllExceptModes,
} from "state/hooks";
import { ProductsListingControlProps } from "types/prop-types";

export default function ProductsListingControl({}: ProductsListingControlProps) {
  const {
    query: queryValue,
    handleQueryChange,
    handleQueryRemove,
  } = useGetFiltersQueryStateAndHandlers();
  const filterDataItems = useGetFiltersFilterDataItems();
  const appliedFilters = useGetAppliedListsFilters();
  const handleQueryClearAll = useGetClearFiltersAllExceptModes();
  return (
    <div>
      <Filters
        queryValue={queryValue}
        filters={filterDataItems}
        appliedFilters={appliedFilters}
        onQueryChange={handleQueryChange}
        onQueryClear={handleQueryRemove}
        onClearAll={handleQueryClearAll}
      />
    </div>
  );
}

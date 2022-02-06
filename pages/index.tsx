import { useState, useMemo, useCallback, MouseEvent } from "react";
import type { NextPage } from "next";
import {
  Tabs,
  IndexTable,
  TextStyle,
  Badge,
  Thumbnail,
  Button,
  Icon,
  useIndexResourceState,
} from "@shopify/polaris";
import { CaretDownMinor } from "@shopify/polaris-icons";
import clsx from "clsx";
import Background from "@ui/Background";
import DisplayPanel from "@ui/DisplayPanel";
import ProductsListingControl from "@ui/ProductsListingControl";
import ProductDisplayModal from "@ui/ProductDisplayModal";
import ModifyChild from "@non-ui/ModifyChild";
import { useAppSelector, useAppDispatch } from "state/store";
import { useGetFilteredProducts } from "state/hooks";
import { createSetFiltersModesPublicationListingMode } from "state/actions/creators";
import { publicationModeTabs } from "data/derived";
import { IIndexResource, ModifyChildAvailableTag } from "types/data";
import { NonEmptyArray } from "types/alias";
import classes from "styles/pages/Home.module.scss";

const Home: NextPage = () => {
  const {
    modes: { publicationListingMode },
  } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const productsFromState = useGetFilteredProducts();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [viewingProductIndex, setViewingProductIndex] = useState(0);
  const [isMoreOptionsPopoverOpen, setIsMoreOptionsPopoverOpen] =
    useState(false);
  const toggleIsMoreOptionsPopoverOpen = useCallback(() => {
    setIsMoreOptionsPopoverOpen(!isMoreOptionsPopoverOpen);
  }, [isMoreOptionsPopoverOpen, setIsMoreOptionsPopoverOpen]);
  const toggleProductModal = useCallback(() => {
    setIsProductModalOpen(!isProductModalOpen);
  }, [isProductModalOpen]);
  const currentPublicationModeTabIndex = useMemo(() => {
    return publicationModeTabs.findIndex((tabItemItx) => {
      return tabItemItx.id === publicationListingMode;
    });
  }, [publicationListingMode]);
  const handlePublicationTabModeChange = useCallback((nextIndex: number) => {
    const nextMode = publicationModeTabs[nextIndex].id;
    dispatch(createSetFiltersModesPublicationListingMode(nextMode));
  }, [dispatch]);
  const productTableResourceName = useMemo(
    () => ({ singular: "product", plural: "products" }),
    []
  );
  const {
    selectedResources: selectedProductResources,
    allResourcesSelected: allProductResourcesSelected,
    handleSelectionChange: handleProductResourceSelectionChange,
  } = useIndexResourceState(productsFromState as unknown as IIndexResource[]);
  const productTableHeadings: NonEmptyArray<{ title: string }> = useMemo(
    () =>
      ["", "Product", "Status", "Inventory", "Type", "Vendor"].map(
        (headingName) => ({ title: headingName })
      ) as NonEmptyArray<{ title: string }>,
    []
  );

  const productTableRowMarkup = useMemo(() => {
    return productsFromState.map(
      (
        {
          id,
          title,
          description,
          image,
          publicationStatus,
          inventoryCount,
          indoorOutdoorType,
          vendorName,
        },
        index
      ) => {
        const clickHandler = (_e: MouseEvent<HTMLTableRowElement>) => {
          setViewingProductIndex(index);
          toggleProductModal();
        };
        return (
          <ModifyChild
            key={id}
            chosenTag={ModifyChildAvailableTag.TR}
            props={{
              "data-power": "3000",
              className: clsx(
                "Polaris-IndexTable__TableRow",
                classes.table_row
              ),
              onClick: clickHandler,
            }}
          >
            <IndexTable.Row
              id={id}
              selected={selectedProductResources.includes(id)}
              position={index}
            >
              <IndexTable.Cell>
                <Thumbnail
                  source={image}
                  size="small"
                  alt={`${title}: ${description}`}
                />
              </IndexTable.Cell>
              <IndexTable.Cell>
                <TextStyle variation="strong">
                  {title.length > 10 ? title.slice(0, 10) + "..." : title}
                </TextStyle>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Badge status="success">{publicationStatus}</Badge>
              </IndexTable.Cell>
              <IndexTable.Cell>
                {typeof inventoryCount !== "number" ? (
                  <TextStyle variation="subdued">
                    Inventory not tracked
                  </TextStyle>
                ) : inventoryCount > 0 ? (
                  inventoryCount
                ) : (
                  <TextStyle variation="negative">{inventoryCount}</TextStyle>
                )}
              </IndexTable.Cell>
              <IndexTable.Cell>{indoorOutdoorType || ""}</IndexTable.Cell>
              <IndexTable.Cell>{vendorName}</IndexTable.Cell>
            </IndexTable.Row>
          </ModifyChild>
        );
      }
    );
  }, [productsFromState, selectedProductResources, toggleProductModal]);

  return (
    <>
      <Background className={classes.page_background}>
        <div className={classes.container}>
          <header className={classes.top_header}>
            <h2 className={clsx("Polaris-Heading", classes.heading)}>
              Products
            </h2>
            <ul className={classes.utils}>
              <li>
                <button className={classes.clear_button}>Export</button>
              </li>
              <li>
                <button className={classes.clear_button}>Import</button>
              </li>
              <li>
                <div className={classes.util_popover}>
                  <button onClick={toggleIsMoreOptionsPopoverOpen}>
                    <span className={classes.text}>More Options</span>
                    <span className={classes.icon}>
                      <Icon source={CaretDownMinor} color="base" />
                    </span>
                  </button>
                  <ul
                    className={clsx(isMoreOptionsPopoverOpen && classes.isOpen)}
                  >
                    <li>Option A</li>
                    <li>Option B</li>
                  </ul>
                </div>
              </li>
              <li>
                <Button primary>Add Product</Button>
              </li>
            </ul>
          </header>
          <DisplayPanel className={classes.content_panel}>
            <header className={classes.panel_header}>
              <Tabs
                tabs={publicationModeTabs}
                selected={currentPublicationModeTabIndex}
                onSelect={handlePublicationTabModeChange}
              ></Tabs>
            </header>
            <main className={classes.panel_body}>
              <ProductsListingControl />
              <main className={classes.item_listing}>
                <IndexTable
                  selectable={false}
                  resourceName={productTableResourceName}
                  itemCount={productsFromState.length}
                  selectedItemsCount={
                    allProductResourcesSelected
                      ? "All"
                      : selectedProductResources.length
                  }
                  headings={productTableHeadings}
                  onSelectionChange={handleProductResourceSelectionChange}
                >
                  {productTableRowMarkup}
                </IndexTable>
              </main>
            </main>
          </DisplayPanel>
        </div>
      </Background>
      {productsFromState.length && (
        <ProductDisplayModal
          isProductModalOpen={isProductModalOpen}
          productItem={productsFromState[viewingProductIndex]}
          handleClose={toggleProductModal}
        />
      )}
    </>
  );
};

export default Home;

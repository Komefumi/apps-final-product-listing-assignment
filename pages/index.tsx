import { useState, useMemo, useCallback, MouseEvent } from "react";
import type { NextPage } from "next";
import {
  TextField,
  Tabs,
  Icon,
  IndexTable,
  TextStyle,
  Badge,
  Thumbnail,
  Modal,
  TextContainer,
  useIndexResourceState,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import clsx from "clsx";
import Background from "@ui/Background";
import DisplayPanel from "@ui/DisplayPanel";
import ModifyChild from "@non-ui/ModifyChild";
import { useAppSelector } from "state/store";
import {
  PublicationStatus,
  IPublicationModeTabData,
  IIndexResource,
} from "types/data";
import { NonEmptyArray } from "types/alias";
import classes from "styles/pages/Home.module.scss";

const ControlSection = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = useCallback((value: string, _id: string) => {
    setSearchText(value);
  }, []);

  return (
    <div>
      <TextField
        value={searchText}
        onChange={handleSearchChange}
        label=""
        placeholder="Search"
        autoComplete="off"
        prefix={<Icon source={SearchMinor} color="base" />}
      />
    </div>
  );
};

const Home: NextPage = () => {
  const { products: productsFromState } = useAppSelector((state) => state);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [viewingProductIndex, setViewingProductIndex] = useState(0);
  const toggleProductModal = useCallback(() => {
    setIsProductModalOpen(!isProductModalOpen);
  }, [isProductModalOpen]);
  const publicationModeTabs: IPublicationModeTabData[] = useMemo(() => {
    const tabDataList: IPublicationModeTabData[] = [
      PublicationStatus.ACTIVE,
      PublicationStatus.DRAFT,
      PublicationStatus.ARCHIVED,
    ].map((statusItem) => ({
      id: statusItem,
      content: statusItem as string,
    }));
    tabDataList.unshift({ id: "All", content: "All" });
    return tabDataList;
  }, []);
  const [currentPublicationModeTabIndex, setCurrentPublicationModeTabIndex] =
    useState<number>(0);
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
        let textStyleForInventoryCount: "subdued" | "negative" | undefined;
        if (!inventoryCount) {
          textStyleForInventoryCount = "subdued";
        } else if (inventoryCount < 0) {
          textStyleForInventoryCount = "negative";
        }
        const clickHandler = (_e: MouseEvent<HTMLTableRowElement>) => {
          setViewingProductIndex(index);
          toggleProductModal();
        };
        return (
          <ModifyChild
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
              key={id}
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
  }, [productsFromState, selectedProductResources]);

  return (
    <>
      <Background className={classes.page_background}>
        <div className={classes.container}>
          <header className={classes.top_header}>
            <h2 className={clsx("Polaris-Heading", classes.heading)}>
              Products
            </h2>
            <ul>
              <li>Export</li>
              <li>Import</li>
            </ul>
          </header>
          <DisplayPanel className={classes.content_panel}>
            <header className={classes.panel_header}>
              <Tabs
                tabs={publicationModeTabs}
                selected={currentPublicationModeTabIndex}
                onSelect={setCurrentPublicationModeTabIndex}
              ></Tabs>
            </header>
            <main className={classes.panel_body}>
              <section className={classes.control_section}>
                <ControlSection />
              </section>
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
      {productsFromState?.length && (
        <Modal
          open={isProductModalOpen}
          onClose={toggleProductModal}
          title={productsFromState[viewingProductIndex].title}
        >
          <Modal.Section>
            <TextContainer>
              <p>Text Content for Modal</p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      )}
    </>
  );
};

export default Home;

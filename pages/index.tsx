import { useState, useMemo, useCallback } from "react";
import type { NextPage } from "next";
import { Autocomplete, TextField, Button, Tabs, Icon } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import clsx from "clsx";
import Background from "@ui/Background";
import DisplayPanel from "@ui/DisplayPanel";
import SwitchByIndex from "@non-ui/SwitchByIndex";
import { PublicationStatus, IPublicationModeTabData } from "types/data";
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
  return (
    <Background className={classes.page_background}>
      <div className={classes.container}>
        <header className={classes.top_header}>
          <h2 className={clsx("Polaris-Heading", classes.heading)}>Products</h2>
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
              <SwitchByIndex currentIndex={currentPublicationModeTabIndex}>
                <div>Me Here</div>
                <div>Me Two Here</div>
              </SwitchByIndex>
            </main>
          </main>
        </DisplayPanel>
      </div>
    </Background>
  );
};

export default Home;

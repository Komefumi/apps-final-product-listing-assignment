import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { Modal, TextContainer, Frame, Loading } from "@shopify/polaris";
import enTranslationsForShopifyPolaris from "@shopify/polaris/locales/en.json";
import { AppProvider as ShopifyPolarisAppProvider } from "@shopify/polaris";
import { fetchProductsFromAPI } from "api";
import store from "state/store";
import { createSetProducts } from "state/actions/creators";
import { generateCompleteProducts } from "data/generate";
import { WrapperProps } from "types/prop-types";
import { useAppSelector, useAppDispatch } from "state/store";
import "styles/globals.scss";

function RenderWithNecessarySetup({ children }: WrapperProps) {
  const [errored, setErrored] = useState(false);
  const { haveWeSetTheProducts } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (haveWeSetTheProducts) return;

    fetchProductsFromAPI()
      .then((productsFromAPI) => {
        const completedProducts = generateCompleteProducts(productsFromAPI);
        dispatch(createSetProducts(completedProducts));
      })
      .catch(() => {
        setErrored(true);
      });
  }, [haveWeSetTheProducts]);

  if (!haveWeSetTheProducts) {
    return (
      <>
        <Head>
          <title>
            {!errored
              ? "Product Listing: Loading..."
              : "Error: Product Listing could not be started"}
          </title>
        </Head>
        <Frame>
          {!errored && <Loading />}
          <Modal
            open={errored}
            title="Error Starting Application"
            onClose={() => {}}
          >
            <Modal.Section>
              <TextContainer>
                <p>There was an error during start up of the application.</p>
                <p>
                  Data could not be fetched. This was likely due to a network
                  error. Please refresh or try again later
                </p>
              </TextContainer>
            </Modal.Section>
          </Modal>
        </Frame>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Product Listing</title>
      </Head>
      <>{children}</>
    </>
  );
}

function MyAppWrappedWithProviders({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ShopifyPolarisAppProvider i18n={enTranslationsForShopifyPolaris}>
        <RenderWithNecessarySetup>
          <Component {...pageProps} />
        </RenderWithNecessarySetup>
      </ShopifyPolarisAppProvider>
    </Provider>
  );
}

export default MyAppWrappedWithProviders;

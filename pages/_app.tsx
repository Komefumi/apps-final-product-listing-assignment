import { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
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
  const { haveWeSetTheProducts } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (haveWeSetTheProducts) return;

    fetchProductsFromAPI().then((productsFromAPI) => {
      const completedProducts = generateCompleteProducts(productsFromAPI);
      dispatch(createSetProducts(completedProducts));
    });
  }, [haveWeSetTheProducts]);
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

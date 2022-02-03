import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
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
  return <>{children}</>;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RenderWithNecessarySetup>
        <Component {...pageProps} />
      </RenderWithNecessarySetup>
    </Provider>
  );
}

export default MyApp;

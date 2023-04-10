import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper, makeStore } from "../store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={makeStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

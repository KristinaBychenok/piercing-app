import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from '../store/store'
import { Wrapper } from "@/components/layouts/wrapper";
import "./i18n";

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store} >
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
}

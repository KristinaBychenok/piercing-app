import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from '../store/store'
import Head from "next/head";
import { Wrapper } from "@/components/layouts/wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store} >
    <Wrapper>
      <Head>
        <title>Daryauo piercing</title>
        <meta name="description" content="App with your recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Wrapper>
  </Provider>
}

import Header from "../components/layouts/Header";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className="page-container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

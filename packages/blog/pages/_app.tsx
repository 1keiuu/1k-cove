import '../styles/globals.css';
import type { AppProps } from 'next/app';
import DefaultHead from '../components/meta/DefaultHead';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultHead meta={{}}></DefaultHead>
      <Component {...pageProps} />
    </>
  );
}

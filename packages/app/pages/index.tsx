import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import About from '../components/sections/about/About';
import FirstView from '../components/sections/firstView/FirstView';
import Links from '../components/sections/links/Links';
import colors from '../constants/colors';

const Home: NextPage = () => {
  const _Main = styled.main`
    background: ${colors.background.primary};
  `;
  const _Inner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;
  /**
   * 指定したselectorに合致するElementまでscrollする
   */
  const scrollTo = (selector?: string) => {
    if (!selector) {
      return;
    }
    const offset =
      (document.querySelector(selector) as HTMLElement).offsetTop - 130;
    if (!offset) return;
    window.scrollTo(0, offset);
  };
  return (
    <_Main>
      <Head>
        <title>Harashima Ikkei&apos;s portfolio</title>
        <meta name="description" content="原島一桂のポートフォリオサイト" />
        <meta
          name="keywords"
          content="エンジニア,webエンジニア,フロントエンド,個人ブログ,ポートフォリオ,技術ブログ,テックブログ"
        />
        <meta property="og:url" content="https://1keiuu.com" />
        <meta property="og:title" content="Harashima Ikkei's portfolio" />
        <meta property="og:site_name" content="Harashima Ikkei's portfolio" />
        <meta
          property="og:description"
          content="原島一桂のポートフォリオサイト"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/portfolio21-56e7e.appspot.com/_ogp/1.jpg"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
      </Head>
      <Header handleItemClick={scrollTo}></Header>
      <_Inner>
        <FirstView></FirstView>
        <About></About>
        <Links></Links>
      </_Inner>
      <Footer></Footer>
    </_Main>
  );
};

export default Home;

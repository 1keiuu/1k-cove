import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import Career from '../components/sections/career/Career';
import Contact from '../components/sections/contact/Contact';
import FirstView from '../components/sections/firstView/FirstView';
import Links from '../components/sections/links/Links';

const Home: NextPage = () => {
  const _Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 25vw;
    @media screen and (max-width: 1024px) {
      padding: 0 20vw 160px;
    }
    @media screen and (max-width: 599px) {
      padding: 0 46px 160px;
    }
  `;
  /**
   * 指定したselectorに合致するElementまでscrollする
   */
  const scrollTo = (selector: string) => {
    const offset =
      (document.querySelector(selector) as HTMLElement).offsetTop - 130;
    if (!offset) return;
    window.scrollTo(0, offset);
  };
  return (
    <main>
      <Head>
        <title>Harashima Ikkei&apos;s portfolio</title>
        <meta
          name="description"
          content="原島一桂のポートフォリオサイトです。"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
      </Head>
      <Header handleItemClick={scrollTo}></Header>
      <_Main>
        <FirstView></FirstView>
        <Career></Career>
        <Links></Links>
        <Contact></Contact>
      </_Main>
      <Footer></Footer>
    </main>
  );
};

export default Home;

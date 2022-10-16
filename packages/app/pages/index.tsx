import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import Career from '../components/sections/career/Career';
import Contact from '../components/sections/contact/Contact';
import FirstView from '../components/sections/firstView/FirstView';
import Links from '../components/sections/links/Links';
import colors from '../constants/colors';

const Home: NextPage = () => {
  const _Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;
  const _Left = styled.div`
    background: ${colors.background.main};
    width: 60vw;
    z-index: 2;
  `;
  const _Right = styled.div`
    background: ${colors.background.main};
    width: 50%;
  `;
  const _ImageWrapper = styled.div`
    height: 100vh;
    width: 30vw;
    background: transparent;
    border-radius: 110px;
    overflow-y: auto;
    position: fixed;
    top: 70%;
    left: 60%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    margin: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  `;
  const _Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 1;
  `;
  const _Image = styled.img`
    height: 100vh;
    vertical-align: top;
  `;
  let currentSectionIndex = 1;

  /**
   * - sectionIndexに合わせてImageWrapperのborder-radiusを変化させる
   * @params sectionIndex
   */
  const transformImageWrapper = useCallback((sectionIndex: number) => {
    const radiusMap: { [key: number]: { [key: string]: string } } = {
      1: {
        topLeft: '110px',
        topRight: '110px',
        bottomRight: '110px',
        bottomLeft: '110px',
      },
      2: {
        topLeft: '60px',
        topRight: '250px',
        bottomRight: '100px',
        bottomLeft: '350px',
      },
      3: {
        topLeft: '460px',
        topRight: '70px',
        bottomRight: '260px',
        bottomLeft: '50px',
      },
      4: {
        topLeft: '100px',
        topRight: '300px',
        bottomRight: '150px',
        bottomLeft: '310px',
      },
    };
    const radius = radiusMap[sectionIndex];
    if (!ImageWrapperRef.current || !radius) return;
    ImageWrapperRef.current.style.transition = 'border-radius 0.6s ease-in';
    ImageWrapperRef.current.style.borderTopLeftRadius = radius.topLeft;
    ImageWrapperRef.current.style.borderTopRightRadius = radius.topRight;
    ImageWrapperRef.current.style.borderBottomRightRadius = radius.bottomRight;
    ImageWrapperRef.current.style.borderBottomLeftRadius = radius.bottomLeft;
  }, []);
  let prevOffset = 0;
  /**
   * scrollイベントが発火した際のhandler
   */
  const handleScroll = () => {
    // scroll量(offset)に合わせて画像の方もscrollする
    const offset = window.pageYOffset;
    ImageWrapperRef.current?.scrollTo(0, offset);
    // windowの縦幅=sectionの縦幅
    const windowHeight = window.innerHeight;
    const bottom = windowHeight * currentSectionIndex;
    const top = windowHeight * (currentSectionIndex - 1);
    // sectionを跨いだ際にImageWrapperのborder-radiusを変化させる
    // スクロール位置が変わっていない場合はスキップ
    if (offset === prevOffset) return;
    // 下方向へのスクロール
    if (offset > prevOffset) {
      // セクションを跨いだ際
      if (offset + windowHeight / 4 > bottom) {
        currentSectionIndex++;
        transformImageWrapper(currentSectionIndex);
        return;
      }
    } else {
      // 上方向へのスクロール
      // セクションを跨いだ際(currentSectionIndex=1の時は発火させない)
      if (currentSectionIndex > 1) {
        if (top + windowHeight / 4 > offset) {
          currentSectionIndex--;
          transformImageWrapper(currentSectionIndex);
          return;
        }
      }
    }
    prevOffset = offset;
  };

  /**
   * 指定したselectorに合致するElementまでscrollする
   * @param sectionIndex 移動するsectionのindex
   */
  const scrollTo = (sectionIndex: number, selector: string) => {
    const offset =
      (document.querySelector(selector) as HTMLElement).offsetTop + 10;
    if (!offset) return;
    currentSectionIndex = sectionIndex;
    window.scrollTo(0, offset - 140);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      handleScroll();
    });
    return () => {
      window.removeEventListener('scroll', () => {
        handleScroll();
      });
    };
  }, []);

  const ImageWrapperRef = useRef<HTMLDivElement>(null);
  const MainRef = useRef<HTMLElement>(null);

  return (
    <main ref={MainRef}>
      <Head>
        <title>Harashima Ikkei's portfolio</title>
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

import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

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

export default function Document() {
  const googleTagManagerId =
    process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || "";
  return (
    <Html>
      <Head>
        {/* <!-- Google Tag Manager --> */}
        {process.env.NODE_ENV === "production" && (
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${googleTagManagerId}');
      `,
            }}
          />
        )}
        {/* <!-- End Google Tag Manager --> */}
      </Head>
      <body>
        {/* <!-- Google Tag Manager (noscript) --> */}
        {process.env.NODE_ENV === "production" && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              />`,
            }}
          />
        )}
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

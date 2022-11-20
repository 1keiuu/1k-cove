import Head from 'next/head';

type DefaultHeadProps = {
  meta?: {
    title?: string;
    description?: string;
    url?: string;
    imgUrl?: string;
    keywords?: string;
  };
};

const DEFAULT_TITLE = '1keiuuのブログ';
const DEFAULT_DESCRIPTION =
  'Ikkei Harashimaの個人ブログです。技術のことだったりをのんびりと。';
const DEFAULT_URL = 'https://blog.1keiuu.com';
const DEFAULT_IMAGE_URL =
  'https://storage.googleapis.com/portfolio21-56e7e.appspot.com/_ogp/1.jpg';
const DEFAULT_KEYWORDS =
  'エンジニア,webエンジニア,フロントエンド,個人ブログ,ポートフォリオ,技術ブログ,テックブログ';

const DefaultHead: React.FC<DefaultHeadProps> = (props) => {
  return (
    <Head>
      <title>{props.meta?.title ?? DEFAULT_TITLE}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="title" content={props.meta?.title ?? DEFAULT_TITLE} />
      <meta
        name="description"
        content={props.meta?.description ?? DEFAULT_DESCRIPTION}
      />
      <meta
        name="keywords"
        content={props.meta?.keywords ?? DEFAULT_KEYWORDS}
      />
      <meta property="og:url" content={props.meta?.url ?? DEFAULT_URL} />
      <meta property="og:title" content={props.meta?.title ?? DEFAULT_TITLE} />
      <meta
        property="og:site_name"
        content={props.meta?.title ?? DEFAULT_TITLE}
      />
      <meta
        property="og:description"
        content={props.meta?.description ?? DEFAULT_DESCRIPTION}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={props.meta?.imgUrl ?? DEFAULT_IMAGE_URL}
      />
      {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap"
        rel="stylesheet"
      /> */}
      <link rel="canonical" href={props.meta?.url} />
    </Head>
  );
};

export default DefaultHead;

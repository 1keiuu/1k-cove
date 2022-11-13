import Head from 'next/head';

type DefaultHeadProps = {
  meta: {
    title: string;
    description: string;
    url: string;
    imgUrl: string;
  };
};

const DefaultHead: React.FC<DefaultHeadProps> = (props) => {
  return (
    <Head>
      <title>{props.meta.title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={props.meta.description} />
      <meta property="og:url" content={props.meta.url} />
      <meta property="og:title" content={props.meta.title} />
      <meta property="og:site_name" content={props.meta.title} />
      <meta property="og:description" content={props.meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={props.meta.imgUrl} />
      {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap"
        rel="stylesheet"
      /> */}
      <link rel="canonical" href={props.meta.url} />
    </Head>
  );
};

export default DefaultHead;

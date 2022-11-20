import { GetStaticProps } from 'next';
import { PostApiClient, initFirebase } from '@1k-cove/common';
import superjson from 'superjson';
import IndexPageContent from '../components/posts/IndexPageContent/IndexPageContent';

const getPostsPerPage = async () => {
  const { db } = initFirebase();
  const client = new PostApiClient(db);
  const posts = await client.listPosts();
  const postsPerPage = [];
  const per = 10;

  while (posts.length > 0) {
    postsPerPage.push(posts.splice(0, per));
  }
  return postsPerPage;
};
export const getStaticPaths = async () => {
  const postsPerPage = await getPostsPerPage();

  const paths = postsPerPage.map((_, i) => {
    return { params: { ':id': (i + 1).toString() } };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const page = context.params?.[':id'] as string;
  if (!page) {
    return {
      props: {},
      notFound: !page,
    };
  }
  const postsPerPage = await getPostsPerPage();

  const posts = postsPerPage[Number(page) - 1];
  return {
    props: {
      posts: superjson.stringify(posts),
      page: page,
      totalPageCount: postsPerPage.length,
    },
    notFound: !posts,
  };
};

export default IndexPageContent;

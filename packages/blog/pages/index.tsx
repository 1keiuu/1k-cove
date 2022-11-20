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

export const getStaticProps: GetStaticProps = async (context) => {
  const postsPerPage = await getPostsPerPage();

  const posts = postsPerPage[0];
  return {
    props: {
      posts: superjson.stringify(posts),
      page: 1,
      totalPageCount: postsPerPage.length,
    },
    notFound: !posts,
  };
};

export default IndexPageContent;

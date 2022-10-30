import { GetStaticProps, NextPage } from 'next';
import { PostApiClient, initFirebase, Post } from '@1k-cove/common';
import superjson from 'superjson';
import styles from '../../styles/Home.module.css';
import Detail from '../../components/posts/Detail/Detail';

type PostIdPageProps = {
  post: string;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  const post = superjson.parse(props.post) as Post;

  return (
    <div className={styles.wrapper}>
      <Detail post={post}></Detail>
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.[':id'] as string;
  if (!slug) {
    return {
      props: {},
      notFound: !slug,
    };
  }
  const { db } = initFirebase();
  const client = new PostApiClient(db);
  const res = await client.getPostBySlug(slug);

  return {
    props: {
      post: superjson.stringify(res),
    },
    notFound: !res,
  };
};

export default PostIdPage;

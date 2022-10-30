import { GetStaticProps, NextPage } from 'next';
import { PostApiClient, initFirebase, Post } from '@1k-cove/common';
import superjson from 'superjson';
import Detail from '../../components/posts/Detail/Detail';

type PostIdPageProps = {
  post: string;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  const post = superjson.parse(props.post) as Post;

  return (
    <div>
      <Detail post={post}></Detail>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { db } = initFirebase();
  const client = new PostApiClient(db);
  const posts = await client.listPosts();

  const paths = posts.map((post) => {
    return { params: { ':id': post.slug } };
  });
  return {
    paths: paths,
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

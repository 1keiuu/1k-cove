import { GetStaticProps, NextPage } from 'next';
import { PostApiClient, initFirebase, Post } from '@1k-cove/common';
import superjson from 'superjson';
import styles from '../styles/Home.module.css';

type PostIdPageProps = {
  posts: string;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  console.log(props.posts);
  const posts = superjson.parse(props.posts) as Post[];

  return (
    <div className={styles.wrapper}>
      <ul>
        {posts.map((post) => {
          return (
            <li>
              <p>{post.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticPaths = async () => {
  const paths = [
    { params: { ':id': 'light-house-2022' } },
    { params: { ':id': '2' } },
  ];
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
  const posts = await client.listPosts();
  return {
    props: {
      posts: superjson.stringify(posts),
    },
    notFound: !posts,
  };
};

export default PostIdPage;

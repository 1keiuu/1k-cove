import { NextPage } from 'next';
import PostApiClient from '../api/posts';
import { initFirebase } from '../utils/firebase';
import superjson from 'superjson';
import { Post } from '../@types/post';
import Link from 'next/link';
import Head from 'next/head';

type PostIndexPageProps = {
  posts: string;
};

const PostIndexPage: NextPage<PostIndexPageProps> = (props) => {
  const posts = superjson.parse(props.posts) as Post[];
  return (
    <>
      <Head>
        <title>Harashima Ikkei’s Blog</title>
        <meta name="description" content="Harashima Ikkei’s Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      ;
      {posts.map((post, i) => {
        return (
          <Link href={`/posts/${post.slug}`} key={`post-${i}-${post.slug}`}>
            {post.title}
          </Link>
        );
      })}
    </>
  );
};

export const getServerSideProps = async () => {
  const { db } = initFirebase();
  const client = new PostApiClient(db);
  const res = await client.listPosts();
  const posts = superjson.stringify(res);

  return {
    props: {
      posts,
    },
  };
};

export default PostIndexPage;

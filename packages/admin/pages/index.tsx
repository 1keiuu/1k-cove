import { NextPage } from 'next';
import { PostApiClient, initFirebase, Post } from '@1k-cove/common';
import superjson from 'superjson';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Index.module.scss';

type IndexPageProps = {
  posts: string;
};

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const posts = superjson.parse(props.posts) as Post[];
  return (
    <div className={styles['inner']}>
      <Head>
        <title>Harashima Ikkei’s Blog</title>
        <meta name="description" content="Harashima Ikkei’s Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles['create-link-wrapper']}>
        <Link href="/posts/new">create</Link>
      </div>
      <ul className={styles['post-item__list']}>
        {posts.length === 0 ? (
          <p>postがありません</p>
        ) : (
          posts.map((post, i) => {
            return (
              <li
                key={`post-${i}-${post.slug}`}
                className={styles['post-item']}
              >
                <Link href={`/posts/${post.slug}`}>
                  {post.date} {post.title}
                </Link>
              </li>
            );
          })
        )}
      </ul>
      <p className={styles['category-link']}>
        <Link href={`/categories`}>カテゴリー</Link>
      </p>
    </div>
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

export default IndexPage;

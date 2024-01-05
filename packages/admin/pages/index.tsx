import { NextPage } from "next";
import { PostApiClient, initFirebase, Post } from "@1k-cove/common";
import superjson from "superjson";
import Link from "next/link";
import Head from "next/head";
import styles from "./Index.module.scss";
import { createClient } from "microcms-js-sdk";
import { useEffect, useState } from "react";

type IndexPageProps = {
  posts: string;
};

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const { db } = initFirebase();
    const client = new PostApiClient(db);
    client.listPosts().then((res) => {
      setPosts(res);
    });
  }, []);
  return (
    <div className={styles["inner"]}>
      <Head>
        <title>Harashima Ikkei’s Blog</title>
        <meta name="description" content="Harashima Ikkei’s Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles["create-link-wrapper"]}>
        <Link href="/posts/new">create</Link>
      </div>
      <ul className={styles["post-item__list"]}>
        {posts.length === 0 ? (
          <p>postがありません</p>
        ) : (
          posts.map((post, i) => {
            return (
              <li
                key={`post-${i}-${post.slug}`}
                className={styles["post-item"]}
              >
                <Link href={`/posts/${post.slug}`}>
                  {post.date} {post.title}
                </Link>
              </li>
            );
          })
        )}
      </ul>
      <p className={styles["category-link"]}>
        <Link href={`/categories`}>カテゴリー</Link>
      </p>
    </div>
  );
};

// export const getServerSideProps = async () => {
//   const client = createClient({
//     serviceDomain: "api-portfolio.microcms",
//     apiKey: "EIxvUldzYjZ7cc4pJopNNnhYETXRl1DGuZTl",
//   });
//   client
//     .get({
//       endpoint: "posts",
//     })
//     .then((res) => console.log(res));
//   const { db } = initFirebase();
//   const client = new PostApiClient(db);
//   const res = await client.listPosts();
//   const posts = superjson.stringify(res);
//   return {
//     props: {
//       posts: [],
//     },
//   };
// };

export default IndexPage;

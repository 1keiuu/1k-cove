import styles from "./page.module.css";
import { Pagination } from "@1k-cove/common";
import PostList from "../../../../_components/posts/PostList/PostList";
import { PAGE_LIMIT } from "../../../../constants";
import { allPosts } from "../../../../../.contentlayer/generated";
import { Metadata, NextPage } from "next";
import Header from "@/app/_components/layouts/Header";
import { TAGS } from "@/data/tags";
import { TAGS_MAP } from "@/data/tags-map";

type Props = {
  params: {
    search: string;
    page: string;
  };
};
export async function generateStaticParams() {
  const tags = Object.values(TAGS);
  const paths = [];
  for (const tag of tags) {
    const postsByTag = allPosts.filter((post) => {
      const tagMap = TAGS_MAP[post.slug];
      return tagMap && tagMap.find((t) => t.slug === tag.slug);
    });
    const totalPageCount = Math.ceil(postsByTag.length / PAGE_LIMIT);
    paths.push(
      ...Array.from({ length: totalPageCount }, (_, i) => {
        return { search: tag.slug, page: (i + 1).toString() };
      })
    );
  }
  return paths;
}

export const metadata: Metadata = {
  title: "1keiuuのブログ",
  description: "Ikkei Harashimaの個人ブログです。",
  openGraph: {
    url: "https://blog.1keiuu.com",
    title: "1keiuuのブログ",
    description: "Ikkei Harashimaの個人ブログです。",
    siteName: "1keiuuのブログ",
    images: [
      "https://storage.googleapis.com/portfolio21-56e7e.appspot.com/_ogp/1.jpg",
    ],
    type: "website",
  },
  keywords:
    "エンジニア,webエンジニア,フロントエンド,個人ブログ,ポートフォリオ,技術ブログ,テックブログ",
};

const PostSearchPage: NextPage<Props> = ({ params }) => {
  let postList = allPosts;
  let tagName = null;
  console.log(params);
  if (params.search != null) {
    postList = postList.filter((post) => {
      const tagMap = TAGS_MAP[post.slug];
      return tagMap.find((t) => t.slug === params.search);
    });
    tagName =
      Object.entries(TAGS).find(
        ([, value]) => value.slug === params.search
      )?.[1].name ?? "";
  }
  const offset = (Number(params.page) - 1) * PAGE_LIMIT;
  const sortedPosts = postList.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });
  const data = sortedPosts.slice(offset, offset + PAGE_LIMIT);
  const totalCount = sortedPosts.length;
  const currentPage = offset / PAGE_LIMIT + 1;
  const totalPageCount = Math.ceil(totalCount / PAGE_LIMIT);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles["page-inner"]}>
          <h1>1keiuuのブログ</h1>
          <p>{tagName ? `${tagName}の検索結果` : ""}</p>
          <PostList posts={data}></PostList>
          <Pagination
            page={currentPage}
            totalCount={totalPageCount}
            path={`/posts/search/${params.search}`}
          ></Pagination>
        </div>
      </main>
    </>
  );
};

export default PostSearchPage;

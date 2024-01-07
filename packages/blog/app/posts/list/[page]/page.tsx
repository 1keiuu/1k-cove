import styles from "./page.module.css";
import { Pagination } from "@1k-cove/common";
import PostList from "../../../_components/posts/PostList/PostList";
import { PAGE_LIMIT } from "../../../constants";
import { allPosts } from "../../../../.contentlayer/generated";
import { Metadata, NextPage } from "next";
import Header from "@/app/_components/layouts/Header";

type Props = {
  params: {
    page: string;
  };
  searchParams: {
    search?: string;
  };
};
export async function generateStaticParams() {
  const totalPageCount = Math.ceil(allPosts.length / PAGE_LIMIT);
  const paths = Array.from({ length: totalPageCount }, (_, i) => {
    return { page: (i + 1).toString() };
  });

  return paths;
}

export const metadata: Metadata = {
  title: "1keiuuのブログ",
  viewport: "width=device-width,initial-scale=1.0",
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

const PostListPage: NextPage<Props> = ({ params, searchParams }) => {
  let postList = allPosts;
  const searchParam = searchParams?.search;
  if (searchParam != null) {
    postList = postList.filter((post) => post.tags.includes(searchParam));
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
          <PostList posts={data}></PostList>
          <Pagination
            page={currentPage}
            totalCount={totalPageCount}
            path="/posts/list"
          ></Pagination>
        </div>
      </main>
    </>
  );
};

export default PostListPage;

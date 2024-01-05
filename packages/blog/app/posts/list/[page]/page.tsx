import styles from "./page.module.css";
import DefaultHead from "../../../_components/meta/DefaultHead";
import { Pagination } from "@1k-cove/common";
import PostList from "../../../_components/posts/PostList/PostList";
import { PAGE_LIMIT } from "../../../constants";
import { allPosts } from "../../../../.contentlayer/generated";
import { NextPage } from "next";
import Header from "@/app/_components/layouts/Header";

type Props = {
  params: {
    page: string;
  };
};
export async function generateStaticParams() {
  const totalPageCount = Math.ceil(allPosts.length / PAGE_LIMIT);
  const paths = Array.from({ length: totalPageCount }, (_, i) => {
    return { page: (i + 1).toString() };
  });

  return paths;
}

const PostListPage: NextPage<Props> = ({ params: { page } }) => {
  const offset = (Number(page) - 1) * PAGE_LIMIT;
  const sortedPosts = allPosts.sort((a, b) => {
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
      <DefaultHead></DefaultHead>
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

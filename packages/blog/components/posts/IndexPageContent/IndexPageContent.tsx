import { NextPage } from "next";
import { Post, Pagination } from "@1k-cove/common";
import superjson from "superjson";
import styles from "./Index.module.scss";
import PostList from "../../posts/PostList/PostList";
import DefaultHead from "../../meta/DefaultHead";

type IndexPageContentProps = {
  posts: string;
  page: number;
  totalPageCount: number;
};

const IndexPageContent: NextPage<IndexPageContentProps> = (props) => {
  const posts = superjson.parse(props.posts) as Post[];

  return (
    <>
      <DefaultHead></DefaultHead>
      <div className={styles["page-inner"]}>
        <h1>1keiuuのブログ</h1>
        <PostList posts={posts}></PostList>
        <Pagination
          page={props.page}
          totalCount={props.totalPageCount}
          path=""
        ></Pagination>
      </div>
    </>
  );
};

export default IndexPageContent;

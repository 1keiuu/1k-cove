import styles from "./Id.module.scss";
import DefaultHead from "../../_components/meta/DefaultHead";
import { PageNavigation } from "@1k-cove/common";
import { allPosts, Post } from "../../../.contentlayer/generated";
import Detail from "@/app/_components/posts/Detail/Detail";
import { notFound } from "next/navigation";
import { NextPage } from "next";

type Props = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const paths = allPosts.map((post: Post) => {
    return { id: post.slug };
  });
  return paths;
}

const PostIdPage: NextPage<Props> = ({ params }) => {
  const metaKeywords = "";
  const post = allPosts.find((p) => p.slug === params.id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <DefaultHead
        meta={{
          title: post.title,
          description: post.description,
          imgUrl: post.ogpUrl,
          keywords: metaKeywords,
          url: `https://blog.1keiuu.com/posts/${post.slug}`,
        }}
      ></DefaultHead>
      <div className={styles["wrapper"]}>
        <div className={styles["inner"]}>
          <div className={styles["page-navigation-wrapper"]}>
            <PageNavigation backPath="/"></PageNavigation>
          </div>
          <div className={styles["detail-wrapper"]}>
            <Detail post={post} postCategory={[]}></Detail>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostIdPage;

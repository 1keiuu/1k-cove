import styles from "./Id.module.scss";
import { PageNavigation } from "@1k-cove/common";
import { allPosts, Post } from "../../../.contentlayer/generated";
import Detail from "@/app/_components/posts/Detail/Detail";
import { notFound } from "next/navigation";
import { Metadata, NextPage } from "next";
import { TAGS_MAP } from "@/data/tags-map";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((p) => p.slug === params.id);
  if (!post) {
    return {
      title: "1keiuuのブログ",
    };
  }
  return {
    title: post.title,
    viewport: "width=device-width,initial-scale=1.0",
    description: post.description,
    openGraph: {
      url: `https://blog.1keiuu.com/posts/${post.slug}`,
      title: post.title,
      description: post.description,
      siteName: post.title,
      images: [post.ogpUrl],
      type: "website",
    },
    keywords:
      "エンジニア,webエンジニア,フロントエンド,個人ブログ,ポートフォリオ,技術ブログ,テックブログ",
  };
}

const PostIdPage: NextPage<Props> = ({ params }) => {
  const post = allPosts.find((p) => p.slug === params.id);
  if (!post) {
    notFound();
  }
  const tags = TAGS_MAP[post.slug];

  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["inner"]}>
          <div className={styles["page-navigation-wrapper"]}>
            <PageNavigation backPath="/"></PageNavigation>
          </div>
          <div className={styles["detail-wrapper"]}>
            <Detail post={post} tags={tags}></Detail>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostIdPage;

import { GetStaticProps, NextPage } from "next";
import {
  PostApiClient,
  initFirebase,
  Post,
  PageNavigation,
  AnchorListItem,
  PostCategoryApiClient,
} from "@1k-cove/common";
import superjson from "superjson";
import styles from "./Id.module.scss";
import Detail from "../../components/posts/Detail/Detail";
import { DomParserWithSSR } from "@1k-cove/md-editor/ssr";
import DefaultHead from "../../components/meta/DefaultHead";
import { PostCategories } from "@1k-cove/common";

type PostIdPageProps = {
  post: string;
  postCategory: string;
  html: string;
  headings: string;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  const post = superjson.parse(props.post) as Post;
  const postCategory = superjson.parse(props.postCategory) as PostCategories;
  const headings = superjson.parse(props.headings) as AnchorListItem[];
  const metaKeywords = postCategory?.categories?.reduce((prev, cur, i) => {
    if (i === 0) return cur.name;
    return prev + `,${cur.name}`;
  }, "");
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
          <Detail
            post={post}
            postCategory={postCategory}
            html={props.html}
            headings={headings}
          ></Detail>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const { db } = initFirebase();
  const client = new PostApiClient(db);
  const posts = (await client.listPublicPosts()) as Post[];

  const paths = posts.map((post) => {
    return { params: { ":id": post.slug } };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.[":id"] as string;
  if (!slug) {
    return {
      props: {},
      notFound: !slug,
    };
  }
  const { db } = initFirebase();
  const postApiClient = new PostApiClient(db);
  const postCategoryApiClient = new PostCategoryApiClient(db);

  const post = await postApiClient.getPostBySlug(slug);
  if (post === null) {
    return {
      notFound: !post,
    };
  }

  const postCategory = await postCategoryApiClient.getPostCategoriesByPostId(
    post.docId
  );

  // parse md to html
  const parser = new DomParserWithSSR();
  const html = parser.parse(post.content);
  const headings = parser.extractHeadings(html);

  return {
    props: {
      post: superjson.stringify(post),
      postCategory: superjson.stringify(postCategory),
      html: html,
      headings: superjson.stringify(headings),
    },
    notFound: !post,
  };
};

export default PostIdPage;

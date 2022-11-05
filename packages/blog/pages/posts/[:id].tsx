import { GetStaticProps, NextPage } from 'next';
import {
  PostApiClient,
  initFirebase,
  Post,
  PageNavigation,
} from '@1k-cove/common';
import superjson from 'superjson';
import styles from '../../styles/pages/posts/Id.module.css';
import Detail from '../../components/posts/Detail/Detail';
import { marked } from 'marked';
import hljs from 'highlightjs';

type PostIdPageProps = {
  post: string;
  html: string;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  const post = superjson.parse(props.post) as Post;
  return (
    <div className={styles['wrapper']}>
      <div className={styles['inner']}>
        <PageNavigation></PageNavigation>
        <Detail post={post} html={props.html}></Detail>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { db } = initFirebase();
  const client = new PostApiClient(db);
  const posts = await client.listPosts();

  const paths = posts.map((post) => {
    return { params: { ':id': post.slug } };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.[':id'] as string;
  if (!slug) {
    return {
      props: {},
      notFound: !slug,
    };
  }
  const { db } = initFirebase();
  const client = new PostApiClient(db);
  const post = await client.getPostBySlug(slug);
  if (post === null) {
    return {
      notFound: !post,
    };
  }
  const html = marked(post.content);
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value;
    },
  });
  return {
    props: {
      post: superjson.stringify(post),
      html: html,
    },
    notFound: !post,
  };
};

export default PostIdPage;

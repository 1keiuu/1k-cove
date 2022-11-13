import { GetStaticProps, NextPage } from 'next';
import {
  PostApiClient,
  initFirebase,
  Post,
  PageNavigation,
  AnchorListItem,
} from '@1k-cove/common';
import superjson from 'superjson';
import styles from '../../styles/pages/posts/Id.module.css';
import Detail from '../../components/posts/Detail/Detail';
import { DomParserWithSSR } from '@1k-cove/md-editor/ssr';

type PostIdPageProps = {
  post: string;
  html: string;
  headings: string;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  const post = superjson.parse(props.post) as Post;
  const headings = superjson.parse(props.headings) as AnchorListItem[];

  return (
    <div className={styles['wrapper']}>
      <div className={styles['inner']}>
        <div className={styles['page-navigation-wrapper']}>
          <PageNavigation backPath="/"></PageNavigation>
        </div>
        <Detail post={post} html={props.html} headings={headings}></Detail>
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
  // parse md to html
  const parser = new DomParserWithSSR();
  const html = parser.parse(post.content);
  const headings = parser.extractHeadings(html);

  return {
    props: {
      post: superjson.stringify(post),
      html: html,
      headings: superjson.stringify(headings),
    },
    notFound: !post,
  };
};

export default PostIdPage;

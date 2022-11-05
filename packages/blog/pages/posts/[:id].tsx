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
import { marked } from 'marked';
import hljs from 'highlightjs';
import { JSDOM } from 'jsdom';

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
        <PageNavigation></PageNavigation>
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
  const html = marked(post.content);
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value;
    },
  });
  // extract headings from html
  const jsdom = new JSDOM(html);
  const h2List = jsdom.window.document.querySelectorAll('h2');
  console.log();
  const headingNames = ['H2', 'H3'];
  // const headings = headingNames.map((heading) => {
  //   const nodeList = jsdom.window.document.querySelectorAll(heading);
  //   [...Array.from(nodeList)].map((node) => {
  //     return node;
  //   });
  // });
  const dom = jsdom.window.document;

  const treeWalker = dom.createTreeWalker(dom, 1, function (node) {
    if (headingNames.includes(node.nodeName)) {
      return 1;
    } else {
      return 3;
    }
  });
  let current;
  const headings: AnchorListItem[] = [];
  while ((current = treeWalker.nextNode())) {
    if (current.nodeName === 'H2') {
      headings.push({
        to: `#${current.textContent}`,
        text: current.textContent ?? '',
        children: [],
      });
    } else if (current.nodeName === 'H3') {
      const last = headings.at(headings.length - 1);
      if (!last) continue;
      last.children.push({
        to: `#${current.textContent}`,
        text: current.textContent ?? '',
        children: [],
      });
    }
  }

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

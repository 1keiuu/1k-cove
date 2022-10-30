import { GetStaticProps, NextPage } from 'next';
import { PostApiClient, initFirebase, Post, Pagination } from '@1k-cove/common';
import superjson from 'superjson';
import styles from '../styles/Index.module.css';
import PostList from '../components/posts/PostList/PostList';

type PostIndexPageProps = {
  posts: string;
  page: number;
  totalPageCount: number;
};

const PostIndexPage: NextPage<PostIndexPageProps> = (props) => {
  const posts = superjson.parse(props.posts) as Post[];

  return (
    <div className={styles['page-inner']}>
      <PostList posts={posts}></PostList>
      <Pagination
        page={props.page}
        totalCount={props.totalPageCount}
        path=""
      ></Pagination>
    </div>
  );
};

const getPostsPerPage = async () => {
  const { db } = initFirebase();
  const client = new PostApiClient(db);
  const posts = await client.listPosts();
  const postsPerPage = [];
  const per = 10;

  while (posts.length > 0) {
    postsPerPage.push(posts.splice(0, per));
  }
  return postsPerPage;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postsPerPage = await getPostsPerPage();

  const posts = postsPerPage[0];
  return {
    props: {
      posts: superjson.stringify(posts),
      page: 1,
      totalPageCount: postsPerPage.length,
    },
    notFound: !posts,
  };
};

export default PostIndexPage;

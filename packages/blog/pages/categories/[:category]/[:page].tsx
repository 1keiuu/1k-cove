import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  PostApiClient,
  initFirebase,
  Post,
  PageNavigation,
  AnchorListItem,
  CategoryApiClient,
  PostCategoryApiClient,
  Pagination,
} from '@1k-cove/common';
import superjson from 'superjson';
import styles from './Id.module.scss';
import Detail from '../../../components/posts/Detail/Detail';
import { DomParserWithSSR } from '@1k-cove/md-editor/ssr';
import DefaultHead from '../../../components/meta/DefaultHead';
import { PostCategories } from '@1k-cove/common';
import { where } from 'firebase/firestore';
import PostList from '../../../components/posts/PostList/PostList';
import { Category } from '@1k-cove/common';
type PostIdPageProps = {
  posts: string;
  category: string;
  page: number;
  totalPageCount: number;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  const posts = superjson.parse(props.posts) as Post[];
  const category = superjson.parse(props.category) as Category;

  return (
    <>
      <DefaultHead></DefaultHead>
      <div className={styles['page-inner']}>
        <h1>{category.name}</h1>
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

const getPostsPerPage = async (slug: string) => {
  const { db } = initFirebase();
  const postApiClient = new PostApiClient(db);
  const postCategoryApiClient = new PostCategoryApiClient(db);

  const postCategoriesList = await postCategoryApiClient.where(
    where('slugs', 'array-contains', slug)
  );

  const postIdList = postCategoriesList.map((p) => {
    return p.postId;
  });

  if (postIdList.length === 0) return [];

  const posts = await postApiClient.where(where('docId', 'in', postIdList));

  const postsPerPage: Post[][] = [];
  const per = 10;

  while (posts.length > 0) {
    postsPerPage.push(posts.splice(0, per));
  }
  return postsPerPage;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = initFirebase();
  const categoryApiClient = new CategoryApiClient(db);

  const categories = await categoryApiClient.listCategories();
  const paths: any = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const postsPerPage = await getPostsPerPage(category.slug);

    for (let i2 = 0; i2 < postsPerPage.length; i2++) {
      paths.push({
        params: { ':category': category.slug, ':page': (i2 + 1).toString() },
      });
    }
  }

  return {
    paths: paths.flat() as any,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const categorySlug = context.params?.[':category'] as string;
  const pageIndex = context.params?.[':page'] as string;

  const { db } = initFirebase();
  const postApiClient = new PostApiClient(db);
  const categoryApiClient = new CategoryApiClient(db);
  const postCategoryApiClient = new PostCategoryApiClient(db);

  // const category = await categoryApiClient.getCategoryBySlug(slug);

  // const postCategoriesList = await postCategoryApiClient.where(
  //   where('slugs', 'array-contains', slug)
  // );

  // const postIdList = postCategoriesList.map((p) => {
  //   return p.postId;
  // });

  // const posts = postApiClient.where(
  //   where('docId', 'array-contains-any', postIdList)
  // );

  return {
    props: {
      posts: superjson.stringify([]),
      category: superjson.stringify({}),
      page: '0',
      totalPageCount: '0',
    },
  };
};

export default PostIdPage;

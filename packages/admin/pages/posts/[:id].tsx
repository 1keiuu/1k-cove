import { GetServerSideProps, NextPage } from 'next';
import {
  PostApiClient,
  PostCategoryApiClient,
  initFirebase,
  Post,
  FirebaseConfig,
  PageNavigation,
  CategoryApiClient,
} from '@1k-cove/common';
import superjson from 'superjson';
import { useState } from 'react';
import styles from './Id.module.scss';
import Loading from '../../components/organisms/shared/Loading/Loading';
import { Category } from '@1k-cove/common/@types/category';
import { PostCategories } from '@1k-cove/common';
import PostIdForm from '../../components/posts/PostIdForm/PostIdForm';

type PostIdPageProps = {
  post: string;
  categories: string;
  postCategories: string;
  firebaseConfig: string;
};

const tabItems = [
  {
    name: 'editor',
    value: 'Editor',
  },
  {
    name: 'preview',
    value: 'Preview',
  },
];

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  const post = superjson.parse(props.post) as Post;
  const firebaseConfig = superjson.parse(
    props.firebaseConfig
  ) as FirebaseConfig;
  const categories = superjson.parse(props.categories) as Category[];
  const postCategories = superjson.parse(
    props.postCategories
  ) as PostCategories;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Loading loading={isLoading}></Loading>
      <div className={styles['navigation-wrapper']}>
        <PageNavigation backPath="/"></PageNavigation>
      </div>
      <PostIdForm
        firebaseConfig={firebaseConfig}
        setIsLoading={setIsLoading}
        post={post}
        postCategories={postCategories}
        categories={categories}
      />
      <Loading loading={isLoading}></Loading>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.[':id'] as string;
  if (!slug) {
    return {
      props: {},
      notFound: !slug,
    };
  }
  const { db } = initFirebase();
  const postApiClient = new PostApiClient(db);
  const categoryApiClient = new CategoryApiClient(db);
  const postCategoryApiClient = new PostCategoryApiClient(db);
  const post = await postApiClient.getPostBySlug(slug);
  if (!post) {
    return {
      props: {},
      notFound: !post,
    };
  }

  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  const categories = await categoryApiClient.listCategories();
  const postCategories = await postCategoryApiClient.getPostCategoriesByPostId(
    post.docId
  );

  return {
    props: {
      post: superjson.stringify(post),
      categories: superjson.stringify(categories),
      postCategories: superjson.stringify(postCategories),
      firebaseConfig: superjson.stringify(firebaseConfig),
    },
    notFound: !post,
  };
};

export default PostIdPage;

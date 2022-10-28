import { GetServerSideProps, NextPage } from 'next';
import PostApiClient from '../../api/posts';
import { initFirebase } from '../../utils/firebase';
import superjson from 'superjson';
import { Post } from '../../@types/post';
import {
  SwitchTab,
  Editor,
  Preview,
  EditorNavigation,
} from '@1k-cove/md-editor';
import { useCallback, useState } from 'react';
import styles from '../../styles/pages/posts/Id.module.css';
import { useForm } from 'react-hook-form';
import { Firestore } from 'firebase/firestore';
import { FirebaseConfig } from '../../@types/firebase';
import Loading from '../../components/organisms/shared/loading/Loading';

type PostIdPageProps = {
  post: string;
  apiClient: string;
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

  const { db } = initFirebase(firebaseConfig);
  const postApiClient = new PostApiClient(db);

  const [displayMode, setDisplayMode] = useState<'editor' | 'preview'>(
    'editor'
  );
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = {
    slug: post.slug,
    title: post.title,
    content: post.content,
  };
  const { handleSubmit, setValue, watch } = useForm<Post>({
    defaultValues,
  });

  const handleContentChange = (content: string) => {
    setValue('content', content);
  };

  const onSubmit = (data: Post) => {
    setIsLoading(true);
    postApiClient.updatePost(data).then(() => {
      setIsLoading(false);
    });
  };

  const watchedContent = watch('content');

  return (
    <div className={styles.page}>
      <Loading loading={isLoading}></Loading>
      <form className={styles.form}>
        <div className={styles.formInner}>
          <SwitchTab
            items={tabItems}
            activeItemName={displayMode}
            onTabItemClick={(name) => {
              setDisplayMode(name as 'editor' | 'preview');
            }}
          ></SwitchTab>
          {displayMode === 'editor' ? (
            <Editor
              defaultContent={watchedContent}
              onContentChange={handleContentChange}
            ></Editor>
          ) : (
            <Preview content={watchedContent}></Preview>
          )}
        </div>
        <EditorNavigation onSubmit={handleSubmit(onSubmit)}></EditorNavigation>
      </form>
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
  const client = new PostApiClient(db);
  const res = await client.getPostBySlug(slug);

  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  return {
    props: {
      post: superjson.stringify(res),
      apiClient: superjson.stringify(client),
      firebaseConfig: superjson.stringify(firebaseConfig),
    },
    notFound: !res,
  };
};

export default PostIdPage;

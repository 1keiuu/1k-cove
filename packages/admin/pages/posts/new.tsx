import { GetServerSideProps, NextPage } from 'next';
import {
  PostApiClient,
  initFirebase,
  Post,
  FirebaseConfig,
  PageNavigation,
} from '@1k-cove/common';
import superjson from 'superjson';
import { useState } from 'react';
import styles from './New.module.scss';
import { useForm } from 'react-hook-form';
import Loading from '../../components/organisms/shared/Loading/Loading';
import CustomInput from '../../components/organisms/shared/CustomInput/CustomInput';
import CustomLabel from '../../components/organisms/shared/CustomLabel/CustomLabel';
import Button from '../../components/organisms/shared/Button/Button';
import Router from 'next/router';

type PostsNewPageProps = {
  firebaseConfig: string;
};

const PostsNewPage: NextPage<PostsNewPageProps> = (props) => {
  const firebaseConfig = superjson.parse(
    props.firebaseConfig
  ) as FirebaseConfig;

  const { db } = initFirebase(firebaseConfig);
  const postApiClient = new PostApiClient(db);

  const [isLoading, setIsLoading] = useState(false);
  const date = new Date();
  const defaultValues = {
    content: '',
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
  };
  const { handleSubmit, register } = useForm<Post>({
    defaultValues,
  });

  const onSubmit = (data: Post) => {
    setIsLoading(true);
    postApiClient.createPost(data).then(() => {
      setIsLoading(false);
      Router.push('/');
    });
  };

  return (
    <div className={styles.wrapper}>
      <Loading loading={isLoading}></Loading>
      <div className={styles['navigation-wrapper']}>
        <PageNavigation backPath="/"></PageNavigation>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <CustomLabel>
          タイトル
          <CustomInput register={register} name="title"></CustomInput>
        </CustomLabel>
        <CustomLabel>
          slug
          <CustomInput register={register} name="slug"></CustomInput>
        </CustomLabel>
        <CustomLabel>
          date
          <CustomInput register={register} name="date"></CustomInput>
        </CustomLabel>
        <Button type="submit">作成</Button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
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
      firebaseConfig: superjson.stringify(firebaseConfig),
    },
  };
};

export default PostsNewPage;

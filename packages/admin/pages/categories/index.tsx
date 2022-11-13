import {
  initFirebase,
  CategoryApiClient,
  FirebaseConfig,
  PageNavigation,
} from '@1k-cove/common';
import { Category } from '@1k-cove/common/@types/category';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import superjson from 'superjson';

type CategoriesIndexPageProps = {
  categories: string;
  firebaseConfig: string;
};

const CategoriesIndex: NextPage<CategoriesIndexPageProps> = (props) => {
  const categoriesProps = superjson.parse(props.categories) as Category[];
  const firebaseConfig = superjson.parse(
    props.firebaseConfig
  ) as FirebaseConfig;

  const { db } = initFirebase(firebaseConfig);
  const categoryApiClient = new CategoryApiClient(db);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const slugInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>(categoriesProps);

  const onSubmit = async () => {
    const nameInput = nameInputRef.current?.value;
    const slugInput = slugInputRef.current?.value;
    if (!nameInput) {
      alert('name is required.');
      return;
    }
    if (!slugInput) {
      alert('slug is required.');
      return;
    }
    const obj = {
      name: nameInput,
      slug: slugInput,
    };
    await categoryApiClient.createCategory(obj).then(() => {
      setCategories([...categories, obj]);
    });
  };

  return (
    <div>
      <PageNavigation backPath="/"></PageNavigation>
      <input placeholder="カテゴリー名" ref={nameInputRef} />
      <input placeholder="slug" ref={slugInputRef} />

      <button onClick={onSubmit}>追加</button>
      <ul>
        {categories.map((category) => {
          return <li key={category.slug}>{category.name}</li>;
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { db } = initFirebase();
  const client = new CategoryApiClient(db);
  const res = await client.listCategories();

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
      categories: superjson.stringify(res),
      firebaseConfig: superjson.stringify(firebaseConfig),
    },
    notFound: !res,
  };
};

export default CategoriesIndex;

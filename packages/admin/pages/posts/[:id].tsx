import { GetServerSideProps, NextPage } from 'next';
import {
  PostApiClient,
  PostCategoryApiClient,
  StorageApiClient,
  initFirebase,
  Post,
  FirebaseConfig,
  PageNavigation,
  LinkCard,
  CategoryApiClient,
} from '@1k-cove/common';
import superjson from 'superjson';
import { SwitchTab, Editor, Preview, DomParser } from '@1k-cove/md-editor';
import { useMemo, useState } from 'react';
import styles from './Id.module.scss';
import { useForm } from 'react-hook-form';
import Loading from '../../components/organisms/shared/Loading/Loading';
import EditorPalette from '../../components/organisms/posts/EditorPalette/EditorPalette';
import CustomTitleInput from '../../components/organisms/shared/CustomTitleInput/CustomTitleInput';
import Router from 'next/router';
import CustomLabel from '../../components/organisms/shared/CustomLabel/CustomLabel';
import CustomInput from '../../components/organisms/shared/CustomInput/CustomInput';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Category } from '@1k-cove/common/@types/category';
import { PostCategories } from '@1k-cove/common';

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

  const { db, storage } = initFirebase(firebaseConfig);
  const postApiClient = new PostApiClient(db);
  const postCategoryApiClient = new PostCategoryApiClient(db);
  const storageClient = new StorageApiClient(storage);

  const [displayMode, setDisplayMode] = useState<'editor' | 'preview'>(
    'editor'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [ogpImageUrl, setOgpImageUrl] = useState(post.ogpUrl ?? '');
  const [imageUrls, setImageUrls] = useState(post.imageUrls ?? []);
  const [linkCards, setLinkCards] = useState<LinkCard[]>([]);
  const defaultValues = post;
  const { handleSubmit, setValue, getValues, watch, register } = useForm<Post>({
    defaultValues,
  });
  const [postCategories, setPostCategories] = useState<PostCategories>(
    superjson.parse(props.postCategories) ?? null
  );

  const functions = getFunctions();
  functions.region = 'asia-northeast1';
  const getOgpInfo = httpsCallable(functions, 'getOgpInfo');

  const handleContentChange = (content: string) => {
    setValue('content', content);
  };

  const onSubmit = (data: Post) => {
    setIsLoading(true);
    postApiClient
      .updatePost(data)
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  const handleDeleteButtonClick = () => {
    setIsLoading(true);
    if (confirm('削除しますか?')) {
      postApiClient
        .deletePost(post.slug)
        .then(() => {
          Router.push('/');
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
    setIsLoading(false);
  };

  const handleOGPInputChange = (files: FileList | null) => {
    setIsLoading(true);
    if (!files) {
      setIsLoading(false);
      return;
    }
    storageClient
      .upload(files[0], `_ogp/${post.docId}`)
      .then((url) => {
        setOgpImageUrl(url);
        setValue('ogpUrl', url);
        const data = getValues();
        postApiClient.updatePost(data).catch((e) => {
          throw new Error(e);
        });
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleImageInputChange = (files: FileList | null) => {
    setIsLoading(true);
    if (!files) {
      setIsLoading(false);
      return;
    }
    storageClient
      .upload(files[0], `posts/${post.docId}/${files[0].name}`)
      .then((url) => {
        const urls = [...imageUrls, url];
        setImageUrls(urls);
        setValue('imageUrls', urls);
        const data = getValues();
        postApiClient.updatePost(data).catch((e) => {
          throw new Error(e);
        });
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleImageDeleteButtonClick = (url: string) => {
    setIsLoading(true);
    imageUrls.splice(imageUrls.indexOf(url), 1);
    post.imageUrls = imageUrls;

    postApiClient
      .updatePost(post)
      .then(() => {
        setIsLoading(false);
        setImageUrls(post.imageUrls);
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  const onLinkCardSubmit = async (src: string | null) => {
    if (src === null) {
      return;
    }
    setIsLoading(true);
    const newLinkCard = await getOgpInfo({ url: src })
      .then((result) => {
        return (result.data as { ogp: LinkCard }).ogp;
      })
      .finally(() => {
        setIsLoading(false);
      });

    setLinkCards([...linkCards, newLinkCard]);
  };

  const onCategoryChipClick = async (
    category: Category,
    eventType: 'on' | 'off'
  ) => {
    if (eventType === 'on') {
      const newCategories = postCategories?.categories
        ? postCategories.categories
        : [];
      // add
      await postCategoryApiClient
        .upsertPostCategories(post.docId, category)
        .then(() => {
          setPostCategories({
            postId: post.docId,
            categories: [...newCategories, category],
          });
        });
    } else if (eventType === 'off') {
      // delete
      const newData = {
        postId: postCategories.postId,
        categories: postCategories.categories.filter(
          (c: Category) => c.slug !== category.slug
        ),
      };
      await postCategoryApiClient.updatePostCategories(newData).then(() => {
        setPostCategories(newData);
      });
    }
  };

  const watchedContent = watch('content');
  const html = useMemo(() => {
    // parse md to html
    const parser = new DomParser();
    const html = parser.parse(watchedContent);
    return html;
  }, [watchedContent]);

  return (
    <div className={styles.wrapper}>
      <Loading loading={isLoading}></Loading>
      <div className={styles['navigation-wrapper']}>
        <PageNavigation backPath="/"></PageNavigation>
      </div>
      <form className={styles.form}>
        <div className={styles['form-inner']}>
          <div className={styles['title-wrapper']}>
            <CustomLabel>
              title
              <CustomTitleInput register={register} name="title" />
            </CustomLabel>
          </div>
          <div className={styles['wrapper-row']}>
            <CustomLabel>
              date
              <CustomInput register={register} name="date" />
            </CustomLabel>
          </div>
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
            <Preview html={html}></Preview>
          )}
        </div>
        <EditorPalette
          onSubmit={handleSubmit(onSubmit)}
          onDeleteButtonClick={handleDeleteButtonClick}
          onOGPInputChange={handleOGPInputChange}
          ogpImageUrl={ogpImageUrl}
          imageUrls={imageUrls}
          linkCards={linkCards}
          categories={categories}
          postCategories={postCategories}
          onImageInputChange={handleImageInputChange}
          onImageDeleteButtonClick={handleImageDeleteButtonClick}
          onLinkCardSubmit={onLinkCardSubmit}
          onCategoryChipClick={onCategoryChipClick}
        ></EditorPalette>
      </form>
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

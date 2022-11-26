import {
  Category,
  FirebaseConfig,
  initFirebase,
  LinkCard,
  Post,
  PostApiClient,
  PostCategories,
  PostCategoryApiClient,
  FunctionsApiClient,
  StorageApiClient,
} from '@1k-cove/common';
import { DomParser, Editor, Preview, SwitchTab } from '@1k-cove/md-editor';
import Router from 'next/router';
import { useMemo, useState } from 'react';
import { useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import EditorPalette from '../../organisms/posts/EditorPalette/EditorPalette';
import CustomInput from '../../organisms/shared/CustomInput/CustomInput';
import CustomLabel from '../../organisms/shared/CustomLabel/CustomLabel';
import CustomTitleInput from '../../organisms/shared/CustomTitleInput/CustomTitleInput';
import styles from './PostIdForm.module.scss';

type PostIdFormProps = {
  firebaseConfig: FirebaseConfig;
  post: Post;
  categories: Category[];
  postCategories: PostCategories;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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

const PostIdForm: React.FC<PostIdFormProps> = (props) => {
  // state
  const [displayMode, setDisplayMode] = useState<'editor' | 'preview'>(
    'editor'
  );
  const [ogpImageUrl, setOgpImageUrl] = useState(props.post.ogpUrl ?? '');
  const [imageUrls, setImageUrls] = useState(props.post.imageUrls ?? []);
  const [linkCards, setLinkCards] = useState<LinkCard[]>([]);
  const [postCategories, setPostCategories] = useState<PostCategories>(
    props.postCategories ?? null
  );
  // api client
  const { db, storage } = initFirebase(props.firebaseConfig);
  const storageClient = new StorageApiClient(storage);
  const postApiClient = new PostApiClient(db);
  const postCategoryApiClient = new PostCategoryApiClient(db);
  const functionsApiClient = new FunctionsApiClient();

  const getOgpInfo = functionsApiClient.callGetOgpInfo();

  const defaultValues = props.post;
  const { handleSubmit, setValue, getValues, watch, register } = useForm<Post>({
    defaultValues,
  });

  const handleContentChange = (content: string) => {
    setValue('content', content);
  };
  const handleOGPInputChange = (files: FileList | null) => {
    props.setIsLoading(true);
    if (!files) {
      props.setIsLoading(false);
      return;
    }
    return storageClient
      .upload(files[0], `_ogp/${props.post.docId}`)
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
        props.setIsLoading(false);
      });
  };
  const handleImageInputChange = (files: FileList | null) => {
    props.setIsLoading(true);
    if (!files) {
      props.setIsLoading(false);
      return;
    }
    storageClient
      .upload(files[0], `posts/${props.post.docId}/${files[0].name}`)
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
        props.setIsLoading(false);
      });
  };
  const handleImageDeleteButtonClick = (url: string) => {
    props.setIsLoading(true);
    imageUrls.splice(imageUrls.indexOf(url), 1);
    props.post.imageUrls = imageUrls;

    postApiClient
      .updatePost(props.post)
      .then(() => {
        props.setIsLoading(false);
        setImageUrls(props.post.imageUrls);
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  const onLinkCardSubmit = async (src: string | null) => {
    if (src === null) {
      return;
    }
    props.setIsLoading(true);
    const newLinkCard = await getOgpInfo({ url: src })
      .then((result) => {
        return (result.data as { ogp: LinkCard }).ogp;
      })
      .finally(() => {
        props.setIsLoading(false);
      });

    setLinkCards([...linkCards, newLinkCard]);
  };

  const watchedContent = watch('content');
  const html = useMemo(() => {
    // parse md to html
    const parser = new DomParser();
    const html = parser.parse(watchedContent);
    return html;
  }, [watchedContent]);

  const onSubmit = (data: Post) => {
    props.setIsLoading(true);
    postApiClient
      .updatePost(data)
      .then(() => {
        props.setIsLoading(false);
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  const handleDeleteButtonClick = () => {
    props.setIsLoading(true);
    if (confirm('削除しますか?')) {
      postApiClient
        .deletePost(props.post.slug)
        .then(() => {
          Router.push('/');
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
    props.setIsLoading(false);
  };

  const onCategoryChipClick = async (
    category: Category,
    eventType: 'on' | 'off'
  ) => {
    if (eventType === 'on') {
      const newCategories = props.postCategories?.categories
        ? props.postCategories.categories
        : [];
      const newSlugs = props.postCategories?.slugs
        ? props.postCategories.slugs
        : [];
      // add
      await postCategoryApiClient
        .upsertPostCategories(props.post.docId, category)
        .then(() => {
          setPostCategories({
            postId: props.post.docId,
            categories: [...newCategories, category],
            slugs: [...newSlugs, category.slug],
          });
        });
    } else if (eventType === 'off') {
      // delete
      const newData = {
        postId: props.postCategories.postId,
        categories: props.postCategories.categories.filter(
          (c: Category) => c.slug !== category.slug
        ),
        slugs:
          props.postCategories?.slugs?.filter(
            (s: string) => s !== category.slug
          ) ?? [],
      };
      await postCategoryApiClient.updatePostCategories(newData).then(() => {
        setPostCategories(newData);
      });
    }
  };

  return (
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
        categories={props.categories}
        postCategories={postCategories}
        onImageInputChange={handleImageInputChange}
        onImageDeleteButtonClick={handleImageDeleteButtonClick}
        onLinkCardSubmit={onLinkCardSubmit}
        onCategoryChipClick={onCategoryChipClick}
      ></EditorPalette>
    </form>
  );
};

export default PostIdForm;

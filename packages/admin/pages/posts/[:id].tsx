import { GetServerSideProps, NextPage } from "next";
import {
  PostApiClient,
  PostCategoryApiClient,
  initFirebase,
  Post,
  FirebaseConfig,
  PageNavigation,
  CategoryApiClient,
  StorageApiClient,
  FunctionsApiClient,
  LinkCard,
} from "@1k-cove/common";
import superjson from "superjson";
import { useState } from "react";
import styles from "./Id.module.scss";
import Loading from "../../components/organisms/shared/Loading/Loading";
import { Category } from "@1k-cove/common/@types/category";
import { PostCategories } from "@1k-cove/common";
import EditorPalette from "../../components/organisms/posts/EditorPalette/EditorPalette";
import Router from "next/router";
import PostIdContent from "../../components/posts/PostIdContent/PostIdContent";
import { useForm } from "react-hook-form";
import Drawer from "../../components/organisms/shared/Drawer/Drawer";
import cloudinary from "../../lib/cloudinary";

type PostIdPageProps = {
  post: string;
  categories: string;
  postCategories: string;
  firebaseConfig: string;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  // server side props
  const post = superjson.parse(props.post) as Post;
  const firebaseConfig = superjson.parse(
    props.firebaseConfig
  ) as FirebaseConfig;
  const categories = superjson.parse(props.categories) as Category[];
  const postCategoriesProps = superjson.parse(
    props.postCategories
  ) as PostCategories;

  // api client
  const { db, storage } = initFirebase(firebaseConfig);
  const storageClient = new StorageApiClient(storage);
  const postApiClient = new PostApiClient(db);
  const postCategoryApiClient = new PostCategoryApiClient(db);
  const functionsApiClient = new FunctionsApiClient();
  const getOgpInfo = functionsApiClient.callGetOgpInfo();

  const [isLoading, setIsLoading] = useState(false);
  const [isPaletteShow, setPaletteShow] = useState(false);

  // state
  const [ogpImageUrl, setOgpImageUrl] = useState(post.ogpUrl ?? "");
  const [imageUrls, setImageUrls] = useState(post.imageUrls ?? []);
  const [linkCards, setLinkCards] = useState<LinkCard[]>([]);
  const [postCategories, setPostCategories] = useState<PostCategories>(
    postCategoriesProps ?? null
  );

  // form
  const defaultValues = post;
  const { handleSubmit, setValue, getValues, watch, register } = useForm<Post>({
    defaultValues,
  });

  const onSubmit = (data: Post) => {
    setIsLoading(true);
    const encodeText = encodeURI(data.title);

    // 第一引数は画像名、第二引数はオプション
    const image = cloudinary.url("ogp.jpg", {
      // URLのバージョンの部分
      version: "1598892930",
      transformation: [
        {
          // 文字を重ねる設定
          overlay: {
            // フォントの設定(アップロードしたフォントも使えます！)
            font_family: "Roboto",
            // フォントのサイズ
            font_size: 50,
            // 文字を中央寄せ
            text_align: "center",
            // 表示するテキスト
            text: encodeText,
          },
          // 文字の領域
          width: "600",
          // 文字の色
          color: "#333",
          // 画像を領域いっぱいに表示させる設定
          crop: "fit",
        },
      ],
    });
    console.log(image);
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
    if (confirm("削除しますか?")) {
      postApiClient
        .deletePost(post.slug)
        .then(() => {
          Router.push("/");
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
    setIsLoading(false);
  };

  const onCategoryChipClick = async (
    category: Category,
    eventType: "on" | "off"
  ) => {
    if (eventType === "on") {
      const newCategories = postCategories?.categories
        ? postCategories.categories
        : [];
      const newSlugs = postCategories?.slugs ? postCategories.slugs : [];
      // add
      await postCategoryApiClient
        .upsertPostCategories(post.docId, category)
        .then(() => {
          setPostCategories({
            postId: post.docId,
            categories: [...newCategories, category],
            slugs: [...newSlugs, category.slug],
          });
        });
    } else if (eventType === "off") {
      // delete
      const newData = {
        postId: postCategories.postId,
        categories: postCategories.categories.filter(
          (c: Category) => c.slug !== category.slug
        ),
        slugs:
          postCategories?.slugs?.filter((s: string) => s !== category.slug) ??
          [],
      };
      await postCategoryApiClient.updatePostCategories(newData).then(() => {
        setPostCategories(newData);
      });
    }
  };

  const handleContentChange = (content: string) => {
    setValue("content", content);
  };

  const handleOGPInputChange = (files: FileList | null) => {
    setIsLoading(true);
    if (!files) {
      setIsLoading(false);
      return;
    }
    return storageClient
      .upload(files[0], `_ogp/${post.docId}`)
      .then((url) => {
        setOgpImageUrl(url);
        setValue("ogpUrl", url);
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
        setValue("imageUrls", urls);
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

  return (
    <div className={styles.wrapper}>
      <Loading loading={isLoading}></Loading>
      {!post.isPublic && (
        <div className={styles["not-public-bar"]}>非公開の記事です</div>
      )}
      <div className={styles["navigation-wrapper"]}>
        <PageNavigation backPath="/"></PageNavigation>
      </div>
      <form className={styles.form}>
        <div
          className={
            isPaletteShow
              ? `${styles["content-wrapper"]} ${styles["--palette-open"]}`
              : styles["content-wrapper"]
          }
        >
          <PostIdContent
            post={post}
            handleContentChange={handleContentChange}
            watch={watch}
            register={register}
          />
        </div>
        <div className={styles["drawer-wrapper"]}>
          <Drawer
            isOpen={isPaletteShow}
            onOpenButtonClick={() => setPaletteShow(true)}
            onCloseButtonClick={() => setPaletteShow(false)}
          >
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
              register={register}
            ></EditorPalette>
          </Drawer>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.[":id"] as string;
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

import { GetServerSideProps, NextPage } from 'next';
import { getPost } from '../../api/posts';
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

type PostIdPageProps = {
  post: string;
};

const PostIdPage: NextPage<PostIdPageProps> = (props) => {
  const post = superjson.parse(props.post) as Post;
  const [displayMode, setDisplayMode] = useState<'editor' | 'preview'>(
    'editor'
  );
  const [content, setContent] = useState(post.content);
  const handleContentChange = useCallback((content: string) => {
    setContent(content);
  }, []);
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
  const handleSubmit = () => {
    console.log(content);
  };
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <SwitchTab
          items={tabItems}
          activeItemName={displayMode}
          onTabItemClick={(name) => {
            setDisplayMode(name as 'editor' | 'preview');
          }}
        ></SwitchTab>
        <div className="inner">
          {displayMode === 'editor' ? (
            <Editor
              content={content}
              onContentChange={handleContentChange}
            ></Editor>
          ) : (
            <Preview content={content}></Preview>
          )}
        </div>
      </div>
      <EditorNavigation onSubmit={handleSubmit}></EditorNavigation>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.[':id'];
  if (!slug) {
    return {
      props: {},
      notFound: !slug,
    };
  }
  const { db } = initFirebase();
  const res = await getPost(db, slug as string);

  return {
    props: {
      post: superjson.stringify(res),
    },
    notFound: !res,
  };
};

export default PostIdPage;

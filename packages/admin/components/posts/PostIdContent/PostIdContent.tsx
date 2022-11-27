import { Post } from '@1k-cove/common';
import { DomParser, Editor, Preview, SwitchTab } from '@1k-cove/md-editor';
import { useMemo, useState } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import CustomInput from '../../organisms/shared/CustomInput/CustomInput';
import CustomLabel from '../../organisms/shared/CustomLabel/CustomLabel';
import CustomTitleInput from '../../organisms/shared/CustomTitleInput/CustomTitleInput';
import styles from './PostIdContent.module.scss';

type PostIdContentProps = {
  post: Post;
  handleContentChange: (content: string) => void;
  watch: UseFormWatch<Post>;
  register: UseFormRegister<Post>;
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

const PostIdContent: React.FC<PostIdContentProps> = (props) => {
  // state
  const [displayMode, setDisplayMode] = useState<'editor' | 'preview'>(
    'editor'
  );

  // formの値を監視してhtmlへ変換
  const watchedContent = props.watch('content');
  const html = useMemo(() => {
    // parse md to html
    const parser = new DomParser();
    const html = parser.parse(watchedContent);
    return html;
  }, [watchedContent]);

  return (
    <div className={styles['inner']}>
      <div className={styles['title-wrapper']}>
        <CustomLabel>
          title
          <CustomTitleInput register={props.register} name="title" />
        </CustomLabel>
      </div>
      <div className={styles['wrapper-row']}>
        <CustomLabel>
          date
          <CustomInput register={props.register} name="date" />
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
          onContentChange={props.handleContentChange}
        ></Editor>
      ) : (
        <Preview html={html}></Preview>
      )}
    </div>
  );
};

export default PostIdContent;

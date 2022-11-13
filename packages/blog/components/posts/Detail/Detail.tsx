import { AnchorListItem, NestedAnchorList, Post } from '@1k-cove/common';
import styles from './Detail.module.css';
import 'highlightjs/styles/github.css';
import { Preview } from '@1k-cove/md-editor';
import BlogKeyVisual from '../BlogKeyVisual/BlogKeyVisual';

type DetailProps = {
  post: Post;
  headings: AnchorListItem[];
  html: string;
};

const Detail: React.FC<DetailProps> = (props) => {
  return (
    <div className={styles['detail']}>
      <BlogKeyVisual imageUrl={props.post.ogpUrl}></BlogKeyVisual>
      <div className={styles['flex']}>
        <div className={styles['content-wrapper']}>
          <Preview html={props.html}></Preview>
        </div>
        <div className={styles['anchor-list-wrapper']}>
          <NestedAnchorList items={props.headings}></NestedAnchorList>
        </div>
      </div>
    </div>
  );
};

export default Detail;

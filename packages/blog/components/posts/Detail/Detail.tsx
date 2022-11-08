import { AnchorListItem, Post } from '@1k-cove/common';
import styles from './Detail.module.css';
import 'highlightjs/styles/github.css';
import { NestedAnchorList } from '@1k-cove/common';
import BlogContent from '../BlogContent/BlogContent';
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
          <BlogContent post={props.post} html={props.html}></BlogContent>
        </div>
        <div className={styles['anchor-list-wrapper']}>
          <NestedAnchorList items={props.headings}></NestedAnchorList>
        </div>
      </div>
    </div>
  );
};

export default Detail;

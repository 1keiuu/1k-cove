import { AnchorListItem, Post } from '@1k-cove/common';
import styles from './Detail.module.css';
import 'highlightjs/styles/github.css';
import { NestedAnchorList } from '@1k-cove/common';
import Content from '../Content/Content';

type DetailProps = {
  post: Post;
  headings: AnchorListItem[];
  html: string;
};

const Detail: React.FC<DetailProps> = (props) => {
  return (
    <div className={styles['detail']}>
      <div className={styles['flex']}>
        <div className={styles['content-wrapper']}>
          <Content post={props.post} html={props.html}></Content>
        </div>
        <div className={styles['anchor-list-wrapper']}>
          <NestedAnchorList items={props.headings}></NestedAnchorList>
        </div>
      </div>
    </div>
  );
};

export default Detail;

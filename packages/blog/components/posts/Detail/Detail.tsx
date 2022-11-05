import { Post } from '@1k-cove/common';
import styles from './Detail.module.css';
import 'highlightjs/styles/github.css';
import { AnchorList } from '@1k-cove/common';
import Content from '../Content/Content';

type DetailProps = {
  post: Post;
  html: string;
};

const Detail: React.FC<DetailProps> = (props) => {
  const anchorListItems = [{ to: '#', name: 'name' }];
  return (
    <div className={styles['detail']}>
      <div className={styles['flex']}>
        <div className={styles['content-wrapper']}>
          <Content post={props.post} html={props.html}></Content>
        </div>
        <div className={styles['anchor-list-wrapper']}>
          <AnchorList items={anchorListItems}></AnchorList>
        </div>
      </div>
    </div>
  );
};

export default Detail;

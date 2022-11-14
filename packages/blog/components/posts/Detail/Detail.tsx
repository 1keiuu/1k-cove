import { AnchorListItem, NestedAnchorList, Post } from '@1k-cove/common';
import styles from './Detail.module.scss';
import 'highlightjs/styles/github.css';
import { Preview } from '@1k-cove/md-editor';
import BlogKeyVisual from '../BlogKeyVisual/BlogKeyVisual';
import BlogInfo from '../BlogInfo/BlogInfo';
import { PostCategory } from '@1k-cove/common/@types/postCategory';

type DetailProps = {
  post: Post;
  postCategory: PostCategory;
  headings: AnchorListItem[];
  html: string;
};

const Detail: React.FC<DetailProps> = (props) => {
  return (
    <div className={styles['detail']}>
      <BlogKeyVisual imageUrl={props.post.ogpUrl}></BlogKeyVisual>
      <div className={styles['blog-info__wrapper']}>
        <BlogInfo
          date={props.post.date}
          postCategory={props.postCategory}
        ></BlogInfo>
      </div>
      <div className={styles['inner']}>
        <div className={styles['preview__wrapper']}>
          <Preview html={props.html}></Preview>
        </div>
        <div className={styles['anchor-list__wrapper']}>
          <NestedAnchorList items={props.headings}></NestedAnchorList>
        </div>
      </div>
    </div>
  );
};

export default Detail;

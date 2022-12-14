import { AnchorListItem, NestedAnchorList, Post } from '@1k-cove/common';
import styles from './Detail.module.scss';
import 'highlightjs/styles/github.css';
import { Preview } from '@1k-cove/md-editor';
import BlogKeyVisual from '../BlogKeyVisual/BlogKeyVisual';
import BlogInfo from '../BlogInfo/BlogInfo';
import { PostCategories } from '@1k-cove/common';

type DetailProps = {
  post: Post;
  postCategory: PostCategories;
  headings: AnchorListItem[];
  html: string;
};

const Detail: React.FC<DetailProps> = (props) => {
  return (
    <div className={styles['detail']}>
      <BlogKeyVisual imageUrl={props.post.ogpUrl}></BlogKeyVisual>
      {/* <h1 className={styles['blog-title']}>{props.post.title}</h1> */}
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

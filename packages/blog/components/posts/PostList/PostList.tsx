import { Post } from '@1k-cove/common';
import PostListItem from '../PostListItem/PostListItem';
import styles from './PostList.module.css';

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = (props) => {
  return (
    <ul className={styles['list']}>
      {props.posts.map((post, i) => {
        return <PostListItem post={post} key={`post-${i}`}></PostListItem>;
      })}
    </ul>
  );
};

export default PostList;

import { Post } from '@1k-cove/common';
import Link from 'next/link';
import styles from './PostListItem.module.css';

type PostListItemProps = {
  post: Post;
};

const PostListItem: React.FC<PostListItemProps> = (props) => {
  return (
    <li className={styles['list-item']}>
      <Link href={`/posts/${props.post.slug}`}>
        <h2>{props.post.title}</h2>
      </Link>
      <p>{props.post.date}</p>
    </li>
  );
};

export default PostListItem;

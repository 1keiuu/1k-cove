import Link from "next/link";
import styles from "./PostListItem.module.css";
import { Post } from "@/.contentlayer/generated";

type PostListItemProps = {
  post: Post;
};

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  return (
    <li className={styles["list-item"]}>
      <Link href={`/posts/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.publishedAt}</p>
    </li>
  );
};

export default PostListItem;

import { Post } from "@/.contentlayer/generated";
import PostListItem from "../PostListItem/PostListItem";
import styles from "./PostList.module.scss";

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul className={styles["list"]}>
      {posts.length === 0 ? (
        <p>投稿はありません</p>
      ) : (
        posts.map((post, i) => {
          return <PostListItem post={post} key={`post-${i}`}></PostListItem>;
        })
      )}
    </ul>
  );
};

export default PostList;

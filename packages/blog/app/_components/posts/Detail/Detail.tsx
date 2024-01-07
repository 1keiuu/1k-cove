import styles from "./Detail.module.scss";
import "highlightjs/styles/github.css";
import BlogInfo from "../BlogInfo/BlogInfo";
import { Post } from "../../../../.contentlayer/generated/";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Tag } from "@/data/tags";

export default function Detail({ post, tags }: { post: Post; tags: Tag[] }) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className={styles["detail"]}>
      <h1 className={styles["blog-title"]}>{post.title}</h1>
      <div className={styles["blog-info__wrapper"]}>
        <BlogInfo date={post.publishedAt} tags={tags}></BlogInfo>
      </div>
      <div className={styles["inner"]}>
        <MDXContent />
      </div>
    </div>
  );
}

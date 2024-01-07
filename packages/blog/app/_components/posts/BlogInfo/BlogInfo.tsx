import styles from "./BlogInfo.module.scss";
import Link from "next/link";
import { Tag } from "@/data/tags";

type BlogInfoProps = {
  date: string;
  tags: Tag[];
};

const BlogInfo: React.FC<BlogInfoProps> = (props) => {
  return (
    <div className={styles["blog-info"]}>
      <p className={styles["blog-date"]}>{props.date ?? "不明"}</p>
      <div className={styles["tag-list"]}>
        {props.tags?.map((tag, i) => {
          return (
            <Link key={`tag-${i}`} href={`/posts/search/${tag.slug}/1`}>
              <p className={styles["tag"]}>#{tag.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default BlogInfo;

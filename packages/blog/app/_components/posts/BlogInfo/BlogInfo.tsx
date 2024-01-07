// import { CategoryChip } from '@1k-cove/common';
import { Category } from "@1k-cove/common/@types/category";
import { CategoryChip, PostCategories } from "@1k-cove/common";
import styles from "./BlogInfo.module.scss";
import Link from "next/link";

type BlogInfoProps = {
  date: string;
  tags: string[];
};

const BlogInfo: React.FC<BlogInfoProps> = (props) => {
  return (
    <div className={styles["blog-info"]}>
      <p className={styles["blog-date"]}>{props.date ?? "不明"}</p>
      <div className={styles["category-chips"]}>
        {props.tags?.map((tag, i) => {
          return (
            <Link key={`tag-${i}`} href={`/posts/list/1?search=${tag}`}>
              <p>#{tag}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default BlogInfo;

// import { CategoryChip } from '@1k-cove/common';
import { Category } from "@1k-cove/common/@types/category";
import { PostCategories } from "@1k-cove/common";
import styles from "./BlogInfo.module.scss";
import Link from "next/link";

type BlogInfoProps = {
  date: string;
  postCategory: PostCategories;
};

const BlogInfo: React.FC<BlogInfoProps> = (props) => {
  const onCategoryChipClick = (category: Category) => {};
  const year = new Date(props.date).getFullYear();
  const day = new Date(props.date).getDate();
  const month = new Date(props.date).toLocaleString("en-us", {
    month: "short",
  });
  const createdAt = `${month} ${day}, ${year}`;
  return (
    <div className={styles["blog-info"]}>
      <p className={styles["blog-date"]}>{createdAt ?? "不明"}</p>
      <div className={styles["category-chips"]}>
        {props.postCategory?.categories?.map((category, i) => {
          return (
            <Link key={`category-${i}`} href={`/categories/${category.slug}/1`}>
              {/* <CategoryChip
                category={category}
                onClick={() => {}}
                isOutlined={true}
              ></CategoryChip> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default BlogInfo;

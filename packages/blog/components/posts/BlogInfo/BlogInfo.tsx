import { CategoryChip } from '@1k-cove/common';
import { Category } from '@1k-cove/common/@types/category';
import { PostCategory } from '@1k-cove/common/@types/postCategory';
import styles from './BlogInfo.module.scss';

type BlogInfoProps = {
  date: string;
  postCategory: PostCategory;
};

const BlogInfo: React.FC<BlogInfoProps> = (props) => {
  const onCategoryChipClick = (category: Category) => {
    console.log(category);
  };
  return (
    <div className={styles['blog-info']}>
      <div className={styles['category-chips']}>
        {props.postCategory?.categories.map((category, i) => {
          return (
            <CategoryChip
              key={`category-${i}`}
              category={category}
              onClick={() => {
                onCategoryChipClick(category);
              }}
            ></CategoryChip>
          );
        })}
      </div>
      <p>{props.date ?? '不明'}</p>
    </div>
  );
};
export default BlogInfo;

import { CategoryChip } from '@1k-cove/common';
import { Category } from '@1k-cove/common/@types/category';
import { PostCategories } from '@1k-cove/common';
import styles from './BlogInfo.module.scss';

type BlogInfoProps = {
  date: string;
  postCategory: PostCategories;
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
              isSelected={false}
            ></CategoryChip>
          );
        })}
      </div>
      <p>{props.date ?? '不明'}</p>
    </div>
  );
};
export default BlogInfo;

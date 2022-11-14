import { Category } from '../../@types/category';
import styles from './CategoryChip.module.scss';

type CategoryChipProps = {
  category: Category;
  onClick: (cateogry: Category) => void;
};

export const CategoryChip: React.FC<CategoryChipProps> = (props) => {
  return (
    <div
      className={styles['category-chip']}
      onClick={() => {
        props.onClick(props.category);
      }}
    >
      {props.category.name}
    </div>
  );
};

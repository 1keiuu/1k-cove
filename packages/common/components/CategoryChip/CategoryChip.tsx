import { Category } from '../../@types/category';
import styles from './CategoryChip.module.scss';

type CategoryChipProps = {
  category: Category;
  onClick: (cateogry: Category) => void;
  isSelected: boolean;
};

export const CategoryChip: React.FC<CategoryChipProps> = (props) => {
  return (
    <div
      className={
        props.isSelected
          ? `${styles['category-chip']} ${styles['--active']}`
          : styles['category-chip']
      }
      onClick={() => {
        props.onClick(props.category);
      }}
    >
      {props.category.name}
    </div>
  );
};

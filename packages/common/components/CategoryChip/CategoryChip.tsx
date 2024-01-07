import { Category } from "../../@types/category";
import styles from "./CategoryChip.module.scss";

type CategoryChipProps = {
  category: Category;
  onClick: (cateogry: Category, eventType: "on" | "off") => void;
  isSelected?: boolean;
  isOutlined?: boolean;
};

export const CategoryChip: React.FC<CategoryChipProps> = (props) => {
  const categoryChipClassNames = (): string => {
    let names = styles["category-chip"];
    if (props.isSelected) {
      names = `${names} ${styles["--active"]}`;
    }
    if (props.isOutlined) {
      names = `${names} ${styles["--outlined"]}`;
    }
    return names;
  };
  return (
    <div
      className={categoryChipClassNames()}
      onClick={() => {
        props.onClick(props.category, props.isSelected ? "off" : "on");
      }}
    >
      {props.category.name}
    </div>
  );
};

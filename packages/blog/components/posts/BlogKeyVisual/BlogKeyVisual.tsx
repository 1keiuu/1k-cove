import styles from "./BlogKeyVisual.module.css";

type BlogKeyVisualProps = {
  imageUrl: string;
};

const BlogKeyVisual: React.FC<BlogKeyVisualProps> = (props) => {
  return (
    <img
      src={props.imageUrl}
      alt="key visual"
      className={styles["key-visual"]}
      width={1200}
      height={630}
    />
  );
};
export default BlogKeyVisual;

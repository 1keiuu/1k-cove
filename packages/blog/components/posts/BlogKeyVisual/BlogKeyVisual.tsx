import styles from './BlogKeyVisual.module.css';

type BlogKeyVisualProps = {
  imageUrl: string;
};

const BlogKeyVisual: React.FC<BlogKeyVisualProps> = (props) => {
  return (
    <img
      src={props.imageUrl}
      alt="blog key visual"
      className={styles['key-visual']}
    />
  );
};
export default BlogKeyVisual;

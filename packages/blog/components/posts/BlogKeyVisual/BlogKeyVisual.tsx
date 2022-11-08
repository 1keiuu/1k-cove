import Image from 'next/image';
import styles from './BlogKeyVisual.module.css';

type BlogKeyVisualProps = {
  imageUrl: string;
};

const BlogKeyVisual: React.FC<BlogKeyVisualProps> = (props) => {
  return (
    <div className={styles['key-visual']}>
      <Image
        src={props.imageUrl}
        alt="blog key visual"
        fill
        object-fit="contain"
      />
    </div>
  );
};
export default BlogKeyVisual;

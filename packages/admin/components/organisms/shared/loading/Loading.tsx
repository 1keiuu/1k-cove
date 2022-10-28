import styles from './Loading.module.css';
import Image from 'next/image';

type LoadingProps = {
  loading: boolean;
};

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div
      className={
        props.loading ? styles.loading : `${styles.loading} ${styles.notActive}`
      }
    >
      <Image
        src="/loading.gif"
        alt="loading"
        width="300"
        height="300"
        className={styles.loadingImage}
      ></Image>
      <p>loading...</p>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default Loading;

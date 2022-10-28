import styles from './EditorNavigation.module.css';

type EditorNavigationProps = {
  onSubmit: () => void;
};

const EditorNavigation: React.FC<EditorNavigationProps> = (props) => {
  return (
    <nav>
      <ul>
        <li className={styles['list-item']}>
          <button
            className={styles['button-base']}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              dispatchEvent(new Event('insertContent'));
            }}
          >
            insert
          </button>
        </li>
        <li className={styles['list-item']}>
          <button
            className={`${styles['button-base']} ${styles['submit-button']}`}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              props.onSubmit();
            }}
          >
            保存
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default EditorNavigation;

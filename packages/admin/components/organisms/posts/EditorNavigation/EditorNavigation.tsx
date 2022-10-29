import styles from './EditorPalette.module.css';

type EditorPaletteProps = {
  onSubmit: () => void;
};

const EditorPalette: React.FC<EditorPaletteProps> = (props) => {
  return (
    <nav>
      <ul>
        <li className={styles['list-item']}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              dispatchEvent(
                new CustomEvent('insertImage', {
                  detail: {
                    url: 'https://avatars.githubusercontent.com/u/46051957?v=4',
                  },
                })
              );
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

export default EditorPalette;

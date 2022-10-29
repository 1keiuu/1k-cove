import Button from '../../shared/Button/Button';
import styles from './EditorPalette.module.css';

type EditorPaletteProps = {
  onSubmit: () => void;
  onDeleteButtonClick: () => void;
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
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              props.onSubmit();
            }}
          >
            保存
          </Button>
        </li>
        <li className={styles['list-item']}>
          <Button
            type="button"
            isOutlined
            onClick={(e) => {
              e.preventDefault();
              props.onDeleteButtonClick();
            }}
          >
            削除する
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default EditorPalette;

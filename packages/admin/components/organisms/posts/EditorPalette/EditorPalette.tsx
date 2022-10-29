import Button from '../../shared/Button/Button';
import CustomLabel from '../../shared/CustomLabel/CustomLabel';
import styles from './EditorPalette.module.css';
import Image from 'next/image';

type EditorPaletteProps = {
  onSubmit: () => void;
  onDeleteButtonClick: () => void;
  onOGPInputChange: (files: FileList | null) => void;
  ogpImageUrl: string;
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
        <li className={styles['list-item']}>
          <CustomLabel>
            OGP
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                e.preventDefault();
                props.onOGPInputChange(e.target.files);
              }}
            />
          </CustomLabel>
          <Image
            className={styles.image}
            src={props.ogpImageUrl}
            alt="OGP image"
            width={300}
            height={300}
          />
        </li>
      </ul>
    </nav>
  );
};

export default EditorPalette;

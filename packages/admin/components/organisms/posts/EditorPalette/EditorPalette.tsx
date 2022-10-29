import Button from '../../shared/Button/Button';
import CustomLabel from '../../shared/CustomLabel/CustomLabel';
import styles from './EditorPalette.module.css';
import Image from 'next/image';

type EditorPaletteProps = {
  onSubmit: () => void;
  onDeleteButtonClick: () => void;
  onOGPInputChange: (files: FileList | null) => void;
  ogpImageUrl: string;
  imageUrls: string[];
  onImageInputChange: (files: FileList | null) => void;
  onImageDeleteButtonClick: (url: string) => void;
};

const EditorPalette: React.FC<EditorPaletteProps> = (props) => {
  return (
    <nav>
      <ul>
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

        <li className={styles['list-item']}>
          <CustomLabel>
            画像
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                e.preventDefault();
                props.onImageInputChange(e.target.files);
              }}
            />
          </CustomLabel>
          <div className={styles['image-group']}>
            {props.imageUrls.map((image, i) => {
              return (
                <button
                  key={`image-${i}`}
                  type="button"
                  className={styles['image-wrapper']}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatchEvent(
                      new CustomEvent('insertImage', {
                        detail: {
                          url: image,
                        },
                      })
                    );
                  }}
                >
                  <Image
                    className={styles.image}
                    src={image}
                    alt="image"
                    width={150}
                    height={150}
                  />
                  <div
                    className={styles['image-delete-button']}
                    onClick={() => {
                      props.onImageDeleteButtonClick(image);
                    }}
                  >
                    ×
                  </div>
                </button>
              );
            })}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default EditorPalette;

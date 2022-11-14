import Button from '../../shared/Button/Button';
import CustomLabel from '../../shared/CustomLabel/CustomLabel';
import styles from './EditorPalette.module.css';
import Image from 'next/image';
import { useRef } from 'react';
import { CategoryChip, LinkCard } from '@1k-cove/common';
import { Category } from '@1k-cove/common/@types/category';

type EditorPaletteProps = {
  onSubmit: () => void;
  onDeleteButtonClick: () => void;
  onOGPInputChange: (files: FileList | null) => void;
  ogpImageUrl: string;
  imageUrls: string[];
  linkCards: LinkCard[];
  categories: Category[];
  onImageInputChange: (files: FileList | null) => void;
  onImageDeleteButtonClick: (url: string) => void;
  onLinkCardSubmit: (src: string | null) => void;
  onCategoryChipClick: (category: Category) => void;
};

const EditorPalette: React.FC<EditorPaletteProps> = (props) => {
  const linkCardInputRef = useRef<HTMLInputElement>(null);

  return (
    <nav className={styles['editor-palette']}>
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
            記事OGP
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
            src={
              props.ogpImageUrl ||
              'https://storage.googleapis.com/portfolio21-56e7e.appspot.com/articles/placeholder/lazy_with_icon.png'
            }
            alt="OGP image"
            width={300}
            height={300}
          />
        </li>
        <li className={styles['list-item']}>
          <CustomLabel>
            <div>
              Link Card
              <button
                onClick={(e) => {
                  e.preventDefault();
                  props.onLinkCardSubmit(
                    linkCardInputRef?.current?.value || null
                  );
                }}
                className={styles['link-card__add-button']}
              >
                追加
              </button>
            </div>
            <input
              type="text"
              ref={linkCardInputRef}
              className={styles['link-card__input']}
            />
            <ul className={styles['link-card__list']}>
              {props.linkCards.map((linkCard, i) => {
                return (
                  <li
                    key={`${linkCard.src}-${i}`}
                    className={styles['link-card__list-item']}
                  >
                    <a
                      href={linkCard.src}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={styles['link-card__title']}
                    >
                      {linkCard.title || 'タイトル不明'}
                    </a>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatchEvent(
                          new CustomEvent('insertLinkCard', {
                            detail: props.linkCards[i],
                          })
                        );
                      }}
                    >
                      挿入
                    </button>
                  </li>
                );
              })}
            </ul>
          </CustomLabel>
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
        <li className={styles['list-item']}>
          <CustomLabel>
            カテゴリー
            <div className={styles['category-chip__group']}>
              {props.categories.map((category, i) => {
                return (
                  <div
                    key={`category-${i}`}
                    className={styles['category-chip__wrapper']}
                  >
                    <CategoryChip
                      category={category}
                      onClick={props.onCategoryChipClick}
                    ></CategoryChip>
                  </div>
                );
              })}
            </div>
          </CustomLabel>
        </li>
      </ul>
    </nav>
  );
};

export default EditorPalette;

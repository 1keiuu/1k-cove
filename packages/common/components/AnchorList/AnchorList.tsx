import Router from 'next/router';
import styles from './AnchorList.module.css';

type AnchorListItem = {
  to: string;
  name: string;
};

type AnchorListProps = {
  items: AnchorListItem[];
};

export const AnchorList: React.FC<AnchorListProps> = (props) => {
  return (
    <nav className={styles['nav']}>
      <ul className={styles['list']}>
        {props.items.map((item, i) => {
          return (
            <li className={styles['list-item']} key={`anchor-${i}`}>
              <a href={item.to}>{item.name}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

import Router from 'next/router';
import styles from './NestedAnchorList.module.css';

export type AnchorListItem = {
  to: string;
  text: string;
  children: AnchorListItem[];
};

type NestedAnchorListProps = {
  items: AnchorListItem[];
};

export const NestedAnchorList: React.FC<NestedAnchorListProps> = (props) => {
  return (
    <nav className={styles['nav']}>
      <ul className={styles['list']}>
        {props.items?.map((item, i1) => {
          return (
            <li className={styles['list-item']} key={`anchor-${i1}`}>
              <a href={item.to}>{item.text}</a>
              {item.children && (
                <ul>
                  {item.children.map((child, i2) => {
                    return (
                      <li
                        className={styles['list-child']}
                        key={`anchor-${i1}-${i2}`}
                      >
                        <a href={child.to}>{child.text}</a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

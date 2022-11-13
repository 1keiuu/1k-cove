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
              <a href={item.to} className={styles['list-item-anchor']}>
                <p>{item.text}</p>
              </a>
              {item.children && (
                <ul className={styles['list-child']}>
                  {item.children.map((child, i2) => {
                    return (
                      <li
                        className={styles['list-child-item']}
                        key={`anchor-${i1}-${i2}`}
                      >
                        <a
                          href={child.to}
                          className={styles['list-child-anchor']}
                        >
                          <p>{child.text}</p>
                        </a>
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

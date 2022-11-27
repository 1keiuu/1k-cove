import IconButton from '../IconButton/IconButton';
import styles from './Drawer.module.scss';

type DrawerProps = {
  children: React.ReactElement;
  isOpen: boolean;
  onOpenButtonClick: () => void;
  onCloseButtonClick: () => void;
};

const Drawer: React.FC<DrawerProps> = (props) => {
  return (
    <div className={styles['drawer']}>
      {props.isOpen ? (
        <IconButton onClick={props.onCloseButtonClick}>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="m12.75 35.95-2.1-2.1 9.9-9.9-9.9-9.9 2.1-2.1 12 12Zm12.65 0-2.1-2.1 9.9-9.9-9.9-9.9 2.1-2.1 12 12Z" />
          </svg>
        </IconButton>
      ) : (
        <IconButton onClick={props.onOpenButtonClick}>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="m22.65 35.95-12-12 12-12 2.1 2.1-9.9 9.9 9.9 9.9Zm12.65 0-12-12 12-12 2.1 2.1-9.9 9.9 9.9 9.9Z" />
          </svg>
        </IconButton>
      )}
      {props.isOpen && props.children}
    </div>
  );
};

export default Drawer;

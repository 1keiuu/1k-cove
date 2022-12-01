import { MouseEventHandler } from 'react';
import styles from './IconButton.module.scss';

type IconButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  isOutlined?: boolean;
};

const IconButton: React.FC<IconButtonProps> = (props) => {
  const getStyles = () => {
    let res = styles['button'];
    if (props.isOutlined !== undefined && props.isOutlined) {
      res += ` ${styles['--outlined']}`;
    } else {
      res += ` ${styles['--primary']}`;
    }
    return res;
  };
  return (
    <button
      className={getStyles()}
      type={props.type ?? 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default IconButton;

import { MouseEventHandler } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  isOutlined?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
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

export default Button;

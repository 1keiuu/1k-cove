import styles from './CustomLabel.module.css';

type CustomLabelProps = {
  children: React.ReactNode
};

const CustomLabel: React.FC<CustomLabelProps> = (props) => {
  return (
    <label className={styles.label}>{
      props.children
    }</label>
  );
};

export default CustomLabel;

import { UseFormRegister } from 'react-hook-form';
import { Post } from '../../../../@types/post';
import styles from './CustomTitleInput.module.css';

type CustomTitleInputProps = {
  register: UseFormRegister<Post>;
  name: keyof Post;
};

const CustomTitleInput: React.FC<CustomTitleInputProps> = (props) => {
  return (
    <input
      {...props.register(props.name)}
      className={styles.input}
      placeholder="タイトル"
    ></input>
  );
};

export default CustomTitleInput;

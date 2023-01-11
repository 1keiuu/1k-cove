import { UseFormRegister } from "react-hook-form";
import { Post } from "../../../../@types/post";
import styles from "./CustomInput.module.css";

type CustomInputProps = {
  register: UseFormRegister<Post>;
  name: keyof Post;
  placeholder?: string;
  required?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = (props) => {
  return (
    <input
      {...props.register(props.name, { required: props.required })}
      className={styles.input}
      placeholder={props.placeholder ?? ""}
    ></input>
  );
};

export default CustomInput;

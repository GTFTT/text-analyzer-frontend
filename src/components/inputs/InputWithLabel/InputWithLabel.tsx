import styles from "./InputWithLabel.module.css"
import Input from "../Input/Input.tsx";

export interface InputWithLabelPropsI extends React.HTMLProps<HTMLInputElement> {
  label: string
}

export function InputWithLabel(props: InputWithLabelPropsI) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <Input {...props} />
    </div>
  );
}

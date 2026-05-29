import styles from "./Input.module.css"

export type InputProps = React.HTMLProps<HTMLInputElement>

function Input(props: InputProps) {
  return (
    <input {...props} className={styles.input}></input>
  );
}

export default Input;
import styles from "./Input.module.css"

export interface InputPropsI extends React.HTMLProps<HTMLInputElement> {
  disabled?: boolean
}

function Input(props: InputPropsI) {
  return (
    <input {...props} className={`${styles.input} ${props.disabled? styles.disabledInput: ""}`}></input>
  );
}

export default Input;
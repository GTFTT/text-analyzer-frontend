import {type ButtonHTMLAttributes} from 'react';
import styles from "./Button.module.css"

export interface ButtonPropsI extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

function Button(props: ButtonPropsI) {
  return (
    <button {...props} className={`${styles.container} ${props.className? props.className: ""} ${props.disabled? styles.disabled: ""}`}></button>
  );
}

export default Button;
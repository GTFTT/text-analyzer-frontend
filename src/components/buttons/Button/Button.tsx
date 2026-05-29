import {type ButtonHTMLAttributes} from 'react';
import styles from "./Button.module.css"

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button(props: ButtonProps) {
  return (
    <button {...props} className={`${styles.container} ${props.className}`}></button>
  );
}

export default Button;
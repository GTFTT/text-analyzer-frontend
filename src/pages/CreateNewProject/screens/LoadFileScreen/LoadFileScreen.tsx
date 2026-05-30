import styles from "./LoadFileScreen.module.css";
import {InputWithLabel} from "../../../../components/inputs/InputWithLabel/InputWithLabel.tsx";

export function LoadFileScreen() {
  return (
    <div className={styles.container}>
      <InputWithLabel label={"Project name"} placeholder={"Enter file path..."} />
    </div>
  );
}
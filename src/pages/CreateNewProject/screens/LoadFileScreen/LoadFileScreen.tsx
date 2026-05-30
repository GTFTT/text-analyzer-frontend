import styles from "./LoadFileScreen.module.css";
import {InputWithLabel} from "../../../../components/inputs/InputWithLabel/InputWithLabel.tsx";
import {FileDropInput} from "../../../../components/inputs/FileDropInput/FileDropInput.tsx";

export function LoadFileScreen() {
  return (
    <div className={styles.container}>
      <InputWithLabel label={"Project name"} placeholder={"Enter file path..."} />
      <FileDropInput onFilesDropped={(files) => {
        console.log(files);
      }} />
    </div>
  );
}
import styles from "./LoadFileScreen.module.css";
import {InputWithLabel} from "../../../../components/inputs/InputWithLabel/InputWithLabel.tsx";
import {FileDropInput} from "../../../../components/inputs/FileDropInput/FileDropInput.tsx";
import {BorderedSection} from "../../../../components/BorderedSection/BorderedSection.tsx";
import {useState} from "react";

export function LoadFileScreen() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  return (
    <div className={styles.container}>
      <InputWithLabel label={"Project name"} placeholder={"Enter file path..."} />
      <FileDropInput onFilesDropped={(files) => {
        console.log(files);
        setCurrentFile(files[0]);
      }} />
      <BorderedSection title={"File info"} className={styles.fileInfoSection}>
        <InputWithLabel label={'File name'} value={currentFile?.name || ""} disabled />
        <InputWithLabel label={'File size'} value={currentFile ? `${currentFile.size} bytes` : ""} disabled />
      </BorderedSection>
    </div>
  );
}
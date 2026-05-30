import styles from "./LoadFileScreen.module.css";
import {InputWithLabel} from "../../../../components/inputs/InputWithLabel/InputWithLabel.tsx";
import {FileDropInput} from "../../../../components/inputs/FileDropInput/FileDropInput.tsx";
import {BorderedSection} from "../../../../components/BorderedSection/BorderedSection.tsx";
import {useEffect, useState} from "react";
import {LoadingBar} from "../../../../components/Loader/LoadingBar.tsx";

export function LoadFileScreen() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

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

      <LoadingBar percentage={percentage}/>
    </div>
  );
}
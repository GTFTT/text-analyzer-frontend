import styles from "./LoadFileScreen.module.css";
import {InputWithLabel} from "../../../../components/inputs/InputWithLabel/InputWithLabel.tsx";
import {FileDropInput} from "../../../../components/inputs/FileDropInput/FileDropInput.tsx";
import {BorderedSection} from "../../../../components/BorderedSection/BorderedSection.tsx";
import {LoadingBar} from "../../../../components/Loader/LoadingBar.tsx";
import Button from "../../../../components/buttons/Button/Button.tsx";
import {useLoadFileScreen} from "./useLoadFileScreen.ts";


export interface LoadFileScreenI {
  onUploadingDone?: () => void;
}

export function LoadFileScreen({ onUploadingDone }: LoadFileScreenI) {
  const {
    currentFile,
    projectName,
    isUploading,
    uploadProgressPercentage,
    isConfirmDisabled,
    isProjectNameErrorVisible,
    onProjectNameChange,
    onFilesDropped,
    onConfirm,
  } = useLoadFileScreen({ onUploadingDone });

  return (
    <div className={styles.container}>
      <InputWithLabel
        label={"Project name"}
        placeholder={"Enter project name..."}
        value={projectName}
        onChange={onProjectNameChange}
      />
      <FileDropInput onFilesDropped={onFilesDropped} />
      <BorderedSection title={"File info"} className={styles.fileInfoSection}>
        <InputWithLabel label={'File name'} value={currentFile?.name || ""} disabled />
        <InputWithLabel label={'File size'} value={currentFile ? `${currentFile.size} bytes` : ""} disabled />
      </BorderedSection>

      {isProjectNameErrorVisible && (
        <p className={styles.error}>Project name is required.</p>
      )}

      <LoadingBar percentage={uploadProgressPercentage}/>

      <Button disabled={isConfirmDisabled} onClick={onConfirm}>
        {isUploading ? "Uploading..." : "Confirm upload"}
      </Button>
    </div>
  );
}
import styles from "./FileDropInput.module.css"
import {useCallback, useState} from "react";

export interface FileDropInputPropsI {
  onFilesDropped?: (files: FileList) => void
}

export function FileDropInput({
  onFilesDropped,
}: FileDropInputPropsI) {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    // Must prevent default so drop is allowed
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Avoid flicker when moving over children:
    // only reset when leaving the drop container itself
    const current = e.currentTarget;
    const related = e.relatedTarget as Node | null;
    if (!related || !current.contains(related)) {
      setIsDragOver(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (!files || files.length === 0) return;

      onFilesDropped?.(files);

      // Optional cleanup
      e.dataTransfer.clearData();
    },
    [onFilesDropped]
  );

  return (
    <div
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      // className={isDragOver ? "dropZone dropZoneActive" : "dropZone"}
      className={`${styles.container} ${isDragOver ? styles.dropZoneActive : ""}`}
    >
      <p>Drop you file here</p>
    </div>
  );
}
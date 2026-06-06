import styles from "./ChunksOverviewScreen.module.css";
import { BorderedSection } from "../../../../components/BorderedSection/BorderedSection.tsx";
import { useChunksOverviewScreen } from "./useChunksOverviewScreen.ts";

export function ChunksOverviewScreen() {
  const {
    currentProjectId,
    chunkItems,
    isLoading,
    isError,
    errorMessage,
    formatEmbeddingPreview,
  } = useChunksOverviewScreen();

  if (currentProjectId === null) {
    return (
      <div className={styles.container}>
        <p className={styles.info}>No active project selected yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.info}>Project ID: {currentProjectId}</p>

      {isLoading && (
        <p className={styles.info}>Loading generated chunks and embeddings...</p>
      )}

      {isError && (
        <p className={styles.error}>Failed to load chunks and embeddings: {errorMessage}</p>
      )}

      <BorderedSection title="Generated chunks" className={styles.sectionContent}>
        {chunkItems.length === 0 ? (
          <p className={styles.info}>No chunks available.</p>
        ) : (
          chunkItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <p className={styles.itemHeader}>Chunk #{item.id}</p>
              <p className={styles.itemText}>{item.chunk}</p>
            </div>
          ))
        )}
      </BorderedSection>

      <BorderedSection title="Generated embeddings" className={styles.sectionContent}>
        {chunkItems.length === 0 ? (
          <p className={styles.info}>No embeddings available.</p>
        ) : (
          chunkItems.map((item) => (
            <div key={`${item.id}-embedding`} className={styles.item}>
              <p className={styles.itemHeader}>Embedding #{item.id}</p>
              <p className={styles.itemText}>{formatEmbeddingPreview(item.embedding)}</p>
            </div>
          ))
        )}
      </BorderedSection>
    </div>
  );
}


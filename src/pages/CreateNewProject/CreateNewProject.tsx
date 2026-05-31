import { useState } from "react";
import styles from "./CreateNewProject.module.css";
import {Wizard} from "../../components/Wizard/Wizard.tsx";
import {LoadFileScreen} from "./screens/LoadFileScreen/LoadFileScreen.tsx";
import { ChunksOverviewScreen } from "./screens/ChunksOverviewSceen/ChunksOverviewScreen.tsx";

export function CreateNewProject() {
  const [isChunksOverviewVisible, setChunksOverviewVisible] = useState(false);

  return (
    <div className={styles.container}>
      <Wizard items={["Create New Project", "Load file", "Chunks overview"]} />
      {isChunksOverviewVisible ? (
        <ChunksOverviewScreen />
      ) : (
        <LoadFileScreen onUploadingDone={() => setChunksOverviewVisible(true)} />
      )}
    </div>
  );
}
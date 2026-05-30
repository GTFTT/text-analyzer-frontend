import styles from "./CreateNewProject.module.css";
import {Wizard} from "../../components/Wizard/Wizard.tsx";
import {LoadFileScreen} from "./screens/LoadFileScreen/LoadFileScreen.tsx";


export function CreateNewProject() {
  return (
    <div className={styles.container}>
      <Wizard items={["Create New Project", "Load file"]} />
      <LoadFileScreen />
    </div>
  );
}
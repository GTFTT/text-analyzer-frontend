import styles from './App.module.css'
import MainRoutesNode from "./../src/components/MainRoutesNode/MainRoutesNode.tsx";
import {Menu} from "./components/Menu/Menu.tsx";

function App() {

  return (
    <div className={styles.app}>
      <div className={styles.menuContainer}>
        <Menu />
      </div>
      <div className={styles.pagesContainer}>
        <MainRoutesNode />
      </div>
    </div>
  )
}

export default App

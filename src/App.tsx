import styles from './App.module.css'
import MainRoutesNode from "./../src/components/MainRoutesNode/MainRoutesNode.tsx";

function App() {
  return (
    <div className={styles.app}>
      {/*<Menu />*/}
      <div className={styles.pagesContainer}>
        <MainRoutesNode />
      </div>
    </div>
  )
}

export default App

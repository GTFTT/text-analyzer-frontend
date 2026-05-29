import styles from './App.module.css'
import MainRoutesNode from "./../src/components/MainRoutesNode/MainRoutesNode.tsx";
import {Menu} from "./components/Menu/Menu.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "./reduxStore/hooks.ts";
import {setMenuItemsAction} from "./components/Menu/menuSlice.ts";

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setMenuItemsAction( [
      {
        id: "project-1",
        label: "Project 1",
      },
      {
        id: "project-2",
        label: "Project 2",
      },
      {
        id: "project-3",
        label: "Project 3",
      },
    ]))
  }, []);

  return (
    <div className={styles.app}>
      <Menu />
      <div className={styles.pagesContainer}>
        <MainRoutesNode />
      </div>
    </div>
  )
}

export default App

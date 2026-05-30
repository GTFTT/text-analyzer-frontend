import styles from "./Menu.module.css"
import {useAppSelector} from "../../reduxStore/hooks.ts";
import {selectMenuItems} from "./menuSlice.ts";
import Button from "../buttons/Button/Button.tsx";
import plus from "../../assets/icons/plus.svg";
import {useNavigate} from "react-router";
import {routes} from "../../config/routes.ts";

export interface MenuPropsI {

}

export function Menu({}: MenuPropsI) {
  const menuItems = useAppSelector(selectMenuItems);
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.title}>PROJECTS LIST</div>
      <div className={styles.body}>
        {
          menuItems.map((menuItem, index) => (
            <Button key={index} className={styles.menuItem}>
              {menuItem.label}
            </Button>
          ))
        }
      </div>
      <div className={styles.bottom}>
        <Button
          onClick={() => navigate(routes.createNew)}
        >
          <img src={plus} alt={"Plus"}/>
        </Button>
      </div>
    </div>
  );
}
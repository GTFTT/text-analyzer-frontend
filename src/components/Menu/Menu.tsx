import styles from "./Menu.module.css"
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../reduxStore/hooks.ts";
import {projectsApi, useDeleteProjectMutation, useGetMenuItemsQuery} from "../../services/projectsApi.ts";
import {selectMenuItems, setMenuItemsAction} from "./menuSlice.ts";
import Button from "../buttons/Button/Button.tsx";
import plus from "../../assets/icons/plus.svg";
import {useNavigate} from "react-router";
import {routes} from "../../config/routes.ts";
import {
  clearCurrentProjectId,
  clearProjectChatHistory,
  selectCurrentProjectId,
  setCurrentProjectId,
  setCurrentProjectName,
} from "../../commonSlices/projects/currentProjectSlice.ts";

export interface MenuPropsI {

}

export function Menu({}: MenuPropsI) {
  const dispatch = useAppDispatch();
  const menuItems = useAppSelector(selectMenuItems);
  const currentProjectId = useAppSelector(selectCurrentProjectId);
  const {data: loadedMenuItems} = useGetMenuItemsQuery();
  const [deleteProject, {isLoading: isDeletingProject}] = useDeleteProjectMutation();
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (loadedMenuItems) {
      dispatch(setMenuItemsAction(loadedMenuItems));
    }
  }, [dispatch, loadedMenuItems]);

  const onMenuItemClick = (projectId: string, projectName: string) => {
    const parsedProjectId = Number(projectId);

    if (Number.isNaN(parsedProjectId)) {
      return;
    }

    dispatch(setCurrentProjectId(parsedProjectId));
    dispatch(setCurrentProjectName(projectName));
    dispatch(clearProjectChatHistory());
    navigate(routes.openExistingWithProjectId(parsedProjectId));
  };

  const onDeleteProjectClick = async (projectId: string) => {
    const parsedProjectId = Number(projectId);

    if (Number.isNaN(parsedProjectId)) {
      return;
    }

    setDeletingProjectId(parsedProjectId);
    try {
      await deleteProject(parsedProjectId).unwrap();

      dispatch(projectsApi.endpoints.getMenuItems.initiate(undefined, {forceRefetch: true}));

      if (currentProjectId === parsedProjectId) {
        dispatch(clearCurrentProjectId());
        navigate(routes.home);
      }
    } catch {
      // Keep UI stable on failure; we can surface an error toast later.
    } finally {
      setDeletingProjectId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>PROJECTS LIST</div>
      <div className={styles.body}>
      <div className={styles.itemsContainer}>
        {
          menuItems.map((menuItem, index) => (
            <div key={index} className={styles.menuItemRow}>
              <Button
                className={styles.menuItem}
                onClick={() => onMenuItemClick(menuItem.id, menuItem.label)}
              >
                {menuItem.label}
              </Button>
              <Button
                className={styles.deleteButton}
                onClick={() => onDeleteProjectClick(menuItem.id)}
                disabled={isDeletingProject && deletingProjectId === Number(menuItem.id)}
                title="Delete project"
                aria-label="Delete project"
              >
                {isDeletingProject && deletingProjectId === Number(menuItem.id) ? "..." : "x"}
              </Button>
            </div>
          ))
        }
      </div>
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
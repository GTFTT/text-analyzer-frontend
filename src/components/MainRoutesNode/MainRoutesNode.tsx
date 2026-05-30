import {Navigate, Route, Routes} from "react-router";
import {routes} from "../../config/routes.ts";
import Home from "../../pages/Home/Home.tsx";
import {CreateNewProject} from "../../pages/CreateNewProject/CreateNewProject.tsx";

function MainRoutesNode() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes.home} replace />} />
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.createNew} element={<CreateNewProject />} />
      <Route path={routes.openExisting} element={<Home />} />
    </Routes>
  );
}

export default MainRoutesNode;
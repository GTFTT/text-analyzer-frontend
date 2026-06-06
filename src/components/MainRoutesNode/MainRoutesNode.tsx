import {Navigate, Route, Routes} from "react-router";
import {routes} from "../../config/routes.ts";
import Home from "../../pages/Home/Home.tsx";
import {CreateNewProject} from "../../pages/CreateNewProject/CreateNewProject.tsx";
import {ExistingProjectChat} from "../../pages/ExistingProjectChat/ExistingProjectChat.tsx";

function MainRoutesNode() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes.home} replace />} />
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.createNew} element={<CreateNewProject />} />
      <Route path={routes.openExisting} element={<ExistingProjectChat />} />
    </Routes>
  );
}

export default MainRoutesNode;
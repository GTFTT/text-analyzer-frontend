import {Navigate, Route, Routes} from "react-router";
import {routes} from "../../config/routes.ts";
import Home from "../../pages/Home/Home.tsx";

function MainRoutesNode() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes.home} replace />} />
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.createNew} element={<Home />} />
      <Route path={routes.openExisting} element={<Home />} />
    </Routes>
  );
}

export default MainRoutesNode;
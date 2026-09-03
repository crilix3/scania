import { Route, Routes } from "react-router";
import { Main } from "../screens";

const AppRoutes = () => {
  const navRoutes = [{ path: "/", element: <Main /> }];

  return (
      <Routes>
      {navRoutes.map((route) => (
        <Route
          key={route.path}
          element={route.element}
          path={route.path}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;

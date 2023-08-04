import { RootState } from "app/store";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = useSelector((state: RootState) => state.auth.userInfo);

  const isLogined = localStorage.getItem("authToken");

  const location = useLocation();
  const { pathname, search } = location;
  const from = pathname + search;

  return auth.authStatus || isLogined ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from }} />
  );
};

export default PrivateRoutes;

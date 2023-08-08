import { RootState } from "app/store";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = useSelector((state: RootState) => state.auth.authUser);
  const isLogined: any = localStorage.getItem("token");

  const location = useLocation();
  const { pathname, search } = location;
  const from = pathname + search;

  return auth?.userName || isLogined ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from }} />
  );
};

export default PrivateRoutes;

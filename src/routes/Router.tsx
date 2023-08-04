import { Routes, Route, Navigate } from "react-router-dom";

import {
  Login,
  Contact,
  Free,
  Pricing,
  Ecommerce,
  Invoice,
  Home,
  Profile,
  Customer,
} from "pages/@index";

import MiniDrawer from "components/MiniDrawer";
import Register from "pages/Auth/Register/Register";
import FreeValid from "pages/FreeValid";
import PrivateRoutes from "utils";
import NotFound from "components/NotFound";
import { useCallback } from "react";

const AppRoutes = () => {
  const token = localStorage.getItem("authToken");

  const PublicRoute = useCallback(
    (Components: any) => {
      return token ? <Navigate to="/" /> : <Components />;
    },
    [token]
  );

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<MiniDrawer />}>
          <Route path="/" element={<Home />} />
          <Route path="customer" element={<Customer />} />
          <Route path="profile" element={<Profile />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="free" element={<Free />} />
          <Route path="freevalid" element={<FreeValid />} />
        </Route>
      </Route>

      <Route path="login" element={PublicRoute(Login)} />
      <Route path="register" element={PublicRoute(Register)} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

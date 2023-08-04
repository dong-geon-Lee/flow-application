import { Routes, Route, useNavigate } from "react-router-dom";

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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import FreeValid from "pages/FreeValid";

const AppRoutes = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.authStatus) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <Routes>
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

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;

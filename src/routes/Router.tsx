import { useEffect } from "react";
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

const AppRoutes = () => {
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
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;

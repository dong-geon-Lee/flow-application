import { Routes, Route } from "react-router-dom";

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

import Register from "pages/Auth/Register/Register";
import FreeValid from "pages/FreeValid";

import MiniDrawer from "components/MiniDrawer";
import NotFound from "components/NotFound";

import PrivateRoutes from "utils";
import Test from "pages/Test";

const AppRoutes = () => {
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
          <Route path="freetest" element={<Test />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route, useNavigate } from "react-router-dom";
import MiniDrawer from "components/MiniDrawer";
import Profile from "pages/Profile";
import Customer from "pages/Customer";
import Home from "pages/Dashboard";
import Invoice from "pages/Invoice";
import Ecommerce from "pages/Ecommerce";
import Contact from "pages/Contact";
import Pricing from "pages/Pricing";
import { useEffect } from "react";

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("customer");
  }, []);

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
      </Route>
    </Routes>
  );
};

export default AppRoutes;

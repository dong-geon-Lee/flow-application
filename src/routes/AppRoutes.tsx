import { Routes, Route, useNavigate } from "react-router-dom";
import MiniDrawer from "components/MiniDrawer";
import Profile from "pages/Profile";
import Customer from "pages/Customer/Customer";
import Home from "pages/Dashboard";
import Invoice from "pages/Invoice";
import Ecommerce from "pages/Ecommerce";
import Contact from "pages/Contact";
import Pricing from "pages/Pricing";
import { useEffect } from "react";
import Free from "pages/Free";
import { ThemeProvider, createTheme } from "@mui/material";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
  status: {
    danger: orange[500],
    info: blue[500],
  },
});

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("pricing");
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;

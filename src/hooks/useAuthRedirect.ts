import { useLocation, useNavigate } from "react-router-dom";

export const useAuthRedirect = () => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const navigate = useNavigate();

  if (token && location.pathname === "/login") navigate("/");
};

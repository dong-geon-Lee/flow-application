import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "app/features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout("로그아웃되었습니다"));
    navigate("/login");

    localStorage.removeItem("authToken");
    localStorage.removeItem("users");
    localStorage.removeItem("singleUser");
  }, [dispatch, navigate]);

  // * MDN 에서 더 공부하고 사용하기
  // const handleEvent = () => {
  //   window.history.pushState(null, "", window.location.href);
  // };

  // useEffect(() => {
  //   window.history.pushState(null, "", window.location.href);
  //   window.addEventListener("popstate", handleEvent);
  //   return () => {
  //     window.removeEventListener("popstate", handleEvent);
  //   };
  // }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} style={{ padding: "1.2rem" }}>
        로그아웃
      </button>
    </div>
  );
};

export default Dashboard;

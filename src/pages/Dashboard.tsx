import { logout } from "app/features/auth/authSlice";
import { RootState } from "app/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout("로그아웃되었습니다"));
    navigate("/login");
  };

  // const { userInfo } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   if (userInfo.authStatus) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [userInfo]);

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

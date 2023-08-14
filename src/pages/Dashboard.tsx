// import { useEffect } from "react";

import axios from "axios";
import { useEffect } from "react";

const Dashboard = () => {
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

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/hello");
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;

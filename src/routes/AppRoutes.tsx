import MiniDrawer from "components/MiniDrawer";
import Profile from "pages/Profile";
import TodoLists from "pages/TodoLists";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
      <h1>Navbar</h1>
      <MiniDrawer />
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="todo" element={<TodoLists />} />
      </Routes>
      <h1>Footer</h1>
    </div>
  );
};

export default AppRoutes;

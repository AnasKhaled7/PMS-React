import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChangePass from "./AuthModule/components/ChangePass/ChangePass";
import ForgotPass from "./AuthModule/components/ForgotPass/ForgotPass";
import Login from "./AuthModule/components/Login/Login";
import Register from "./AuthModule/components/Register/Register";
import ResetPass from "./AuthModule/components/ResetPass/ResetPass";
import VerifyAccount from "./AuthModule/components/VerifyAccount/VerifyAccount";
import Home from "./HomeModule/components/Home/Home";
import ProjectsList from "./ProjectsModule/components/ProjectsList/ProjectsList";
import MasterLayout from "./SharedModule/components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/components/NotFound/NotFound";
import TasksList from "./TasksModule/components/TasksList/TasksList";
import UserList from "./UserModule/components/UserList/UserList";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <UserList /> },
        { path: "tasks", element: <TasksList /> },
        { path: "projects", element: <ProjectsList /> },
      ],
    },

    {
      path: "/",
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "forgot-pass", element: <ForgotPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "register", element: <Register /> },
        { path: "verification", element: <VerifyAccount /> },
        { path: "change-pass", element: <ChangePass /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={routes} />
    </>
  );
}

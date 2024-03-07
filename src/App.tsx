import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./SharedModule/components/ProtectedRoute/ProtectedRoute";
import Home from "./HomeModule/components/Home/Home";
import NotFound from "./SharedModule/components/NotFound/NotFound";
import AuthLayout from "./SharedModule/components/AuthLayout/AuthLayout";
import Login from "./AuthModule/components/Login/Login";
import ResetPass from "./AuthModule/components/ResetPass/ResetPass";
import Register from "./AuthModule/components/Register/Register";
import VerifyAccount from "./AuthModule/components/VerifyAccount/VerifyAccount";
import ForgotPass from "./AuthModule/components/ForgotPass/ForgotPass";
import ChangePass from "./AuthModule/components/ChangePass/ChangePass";
import UserList from "./UserModule/components/UserList/UserList";
import TasksList from "./TasksModule/components/TasksList/TasksList";
import ProjectsList from "./ProjectsModule/componenets/ProjectsList/ProjectsList";

export default function App() {

  const routes = createBrowserRouter([
    {
      path: "dashboard",
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
      <RouterProvider router={routes} />
    </>
  );
}

import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import  { jwtDecode,JwtPayload } from 'jwt-decode';
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
import ProtectedRoute from "./SharedModule/components/ProtectedRoute/ProtectedRoute";

import React, { Suspense, lazy } from 'react';

// Lazy load the Register component
const LazyRegister = lazy(() => import('./AuthModule/components/Register/Register'));


export default function App() {

  const [userData, setUserData] = useState<JwtPayload | null>(null);

  const saveUserData = () => {
    const token = localStorage?.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      setUserData(decodedToken);
    }
  };

  useEffect(() => {
    saveUserData();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
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
        { index: true, element: <Login saveUserData={saveUserData} /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "forgot-pass", element: <ForgotPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        // { path: "register", element: <Register /> },
        // Use the lazy loaded Register component here
        { path: 'register', element: <LazyRegister /> },
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

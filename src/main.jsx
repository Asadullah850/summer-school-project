import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import App from "./App";
import Home from "./Container/Home/Home";
import InstructorHome from "./Container/Dashboard/Instructor/InstructorHome";
import Dashboard from "./Container/Dashboard/Dashboard";
import ClassAdd from "./Container/Dashboard/ClassAdd/ClassAdd";
import MyClasses from "./Container/Dashboard/MyClasses/MyClasses";
import AuthProvider, { AuthContext } from "./Container/Routes/AuthProvider";
import Register from "./Container/LoginReg/Register";
import AdminHome from "./Container/Dashboard/Admin/AdminHome";
import AllUsers from "./Container/Dashboard/Admin/AllUsers";
import UserHome from "./Container/Dashboard/User/UserHome";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Login from "./Container/LoginReg/Login";
import AllClass from "./Container/Dashboard/Admin/AllClass";

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
    ],
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'admin',
        element: <AdminHome></AdminHome>
      },
      {
        path: 'allUsers',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'allClasses',
        element: <AllClass></AllClass>
      },
      {
        path: 'instructor',
        element: <InstructorHome></InstructorHome>
      },
      {
        path: 'classAdd',
        element: <ClassAdd></ClassAdd>
      },
      {
        path: 'userDashboard',
        element: <UserHome></UserHome>
      },
      {
        path: 'myclasses',
        element: <MyClasses></MyClasses>
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
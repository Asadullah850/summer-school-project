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
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'instructor',
        element: <InstructorHome></InstructorHome>
      },
      {
        path: 'classAdd',
        element: <ClassAdd></ClassAdd>
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
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
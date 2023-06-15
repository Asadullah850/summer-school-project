import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import App from "./App";
import Home from "./Container/Home/Home";
import InstructorHome from "./Container/Dashboard/Instructor/InstructorHome";
import Dashboard from "./Container/Dashboard/Dashboard";
import ClassAdd from "./Container/Dashboard/Instructor/ClassAdd";
import MyClasses from "./Container/Dashboard/Instructor/MyClasses";
import AuthProvider, { AuthContext } from "./Container/Routes/AuthProvider";
import Register from "./Container/LoginReg/Register";
import AdminHome from "./Container/Dashboard/Admin/AdminHome";
import AllUsers from "./Container/Dashboard/Admin/AllUsers";


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Login from "./Container/LoginReg/Login";
import AllClass from "./Container/Dashboard/Admin/AllClass";
import MyClass from "./Container/Dashboard/User/MyClass";
import EnrollClass from "./Container/Dashboard/User/EnrollClass";
import PaymentHistory from "./Container/Dashboard/User/PaymentHistory";
import PrivetRoute from "./Container/Routes/PrivetRoute";
import Feedback from "./Container/Dashboard/Admin/Feedback";
import FeedbackPage from "./Container/Dashboard/Instructor/FeedbackPage";
import Update from "./Container/Dashboard/Instructor/Update";
import DeniedFeedback from "./Container/Dashboard/Admin/DeniedFeedback";
import UserFeedback from "./Container/Dashboard/Admin/UserFeedback";
import Allclass from "./Container/AllClasses/Allclass";
import InstructorsPage from "./Container/Istrucroes/InstructorsPage";

const queryClient = new QueryClient()
// To to make a logout button

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/instructors',
        element: <InstructorsPage></InstructorsPage>
      },
      {
        path: '/allclass',
        element: <Allclass></Allclass>
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
    element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
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
        path: 'userFeedback/:id',
        element: <UserFeedback></UserFeedback>
      },
      {
        path: 'allClasses',
        element: <AllClass></AllClass>
      },
      {
        path: 'feedback/:id',
        element: <Feedback></Feedback>
      },
      {
        path: 'instructor',
        element: <MyClasses></MyClasses>
      },
      {
        path: 'update/:id',
        element: <Update></Update>
      },
      {
        path: 'denied/:id',
        element: <DeniedFeedback></DeniedFeedback>
      },
      {
        path: 'myclasses',
        element: <MyClasses></MyClasses>
      },
      {
        path: 'feedbackPage',
        element: <FeedbackPage></FeedbackPage>
      },
      {
        path: 'classAdd',
        element: <ClassAdd></ClassAdd>
      },
      {
        path: 'studentClasses',
        element: <MyClass></MyClass>
      },
      {
        path: 'enroll',
        element: <EnrollClass></EnrollClass>
      },
      {
        path: 'payment',
        element: <PaymentHistory></PaymentHistory>
      },

    ]
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);